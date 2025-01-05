import React, { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { GiPlainCircle } from "react-icons/gi";
import { MdEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { Box, Text, Flex, useDisclosure, Icon, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Button } from '@chakra-ui/react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { format } from 'date-fns';
import { differenceInDays } from 'date-fns';
import axios from 'axios';
import EditProduct from './EditProduct';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'

export default function Product({ product, fetchProducts, showAlert }) {
    const { isOpen: isOpen1, onOpen: onOpen1 , onClose:onClose1 } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2 , onClose:onClose2 } = useDisclosure();
    const cancelRef = React.useRef()

    //formatting date
    const [show, setShow] = useState(false);
    const dateinraw = product.dateIn
    const datein = format(dateinraw, 'MMMM do, yyyy')
    const dateoutraw = product.dateOut
    const dateout = format(dateoutraw, 'MMMM do, yyyy')
    const id = product._id

    const [qualityColor, setQualityColor] = useState()
    const [stockstatus, setStock] = useState()



    //calculating quality
    const calculateQuality = () => {
        const totalDays = differenceInDays(dateoutraw, dateinraw)
        const today = new Date();
        const daysLeft =  differenceInDays(dateoutraw, today)

        if (product.stock == false){
            setQualityColor('#CBD5E0')
        } else {
            if (daysLeft <= 0) {
                setQualityColor('#9B2C2C');
            } else if (daysLeft < totalDays / 2) {
                setQualityColor('#F6AD55');
            } else {
                setQualityColor('#9AE6B4');
            }
        }
        
    }


    const calculateStock = () => {
        const stock = product.stock
        setStock(stock ? 'In Stock' : 'No Stock')
    }

     // Set up interval to check the date every day
     useEffect(() => {
        // Call the function when the component mounts
        calculateQuality();
        calculateStock();

        // Set up a daily interval (check every 24 hours)
        const intervalId = setInterval(() => {
            calculateQuality();
        }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [dateoutraw, dateinraw]);

    //handle product delete
    const handleDelete = () => {

        axios
        .delete(`http://localhost:5555/fridge/${id}`)
        .then(() => {
            showAlert("success", 'Product deleted')
            fetchProducts();
        })
        .catch((error) => {
            showAler('error', 'An error happened. Check console.');
            console.log(error);
        });
    }

    //handle add to cart to local storage
    const [cart, setCart] = useState([])

    const addToCart = () => {
       

        let cartProduct = {
            id: product._id,
            name: product.product,
            quantity: 1,
            unit: product.quantity.unit,
            cost: product.cost,
            total: product.cost,
        }

        let cartArray = JSON.parse(localStorage.getItem('cartArray'));
    
        if (cartArray !== null) {
            const existingProductIndex = cartArray.findIndex(element => element.id === cartProduct.id);
            if (existingProductIndex !== -1) {
                cartArray[existingProductIndex].quantity += cartProduct.quantity;
                cartArray[existingProductIndex].total = cartArray[existingProductIndex].cost * cartArray[existingProductIndex].quantity
            } else {
                cartArray.push(cartProduct);
            }
    
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
        } else {
            localStorage.setItem("cartArray", JSON.stringify([cartProduct]));
        }
        showAlert("success", `${product.product} added to cart.`)
      }
         

    


  return (
    <>
    <Box p={2} border='2px' borderColor='teal' width='230px' borderRadius='10px'>
        <Flex alignItems='center' justifyContent='space-between' onClick={()=> setShow(!show)}>
            <Text fontWeight='600'>{product.product}</Text> 
            
            <Flex alignItems='center' gap={2}> 
                <Text>{stockstatus}</Text>
                <GiPlainCircle color={qualityColor} />
            </Flex>

            

        </Flex>

        <Flex alignItems='end' justifyContent='space-between'>
            <Flex direction='column'>
                <Text>{product.quantity.number} {product.quantity.unit}</Text>
                {show && (
                <>
                    <Text><b>In:</b> {datein}</Text>
                    <Text><b>Out:</b> { dateout}</Text>
                    <Text><b>Cost:</b> ${product.cost}</Text>
                </>
                )}
                    
            </Flex>

            <Flex gap={2}>
            <Icon as={MdOutlineAddShoppingCart}  onClick={() => addToCart(product)}
                sx={{
                color: 'grey',
                transition: '.3s',
                _hover: { color: 'teal.400', cursor: 'pointer'  },  // Hover styles
            }} />
                <Icon as={MdEdit} onClick={onOpen1}
                sx={{
                    color: 'grey',
                    transition: '.3s',
                    _hover: { color: 'teal.400', cursor: 'pointer'  },  // Hover styles
                }}
                />
                <Icon as={FiTrash} onClick={onOpen2}
                sx={{
                    color: 'grey',
                    transition: '.3s',
                    _hover: { color: 'teal.400', cursor: 'pointer'  },  // Hover styles
                }}
                />
            </Flex>

        </Flex>
    </Box>
    <EditProduct isOpen={isOpen1} onClose={onClose1} fetchProducts={fetchProducts} id={id} showAlert={showAlert} />
    
    <AlertDialog
        isOpen={isOpen2}
        leastDestructiveRef={cancelRef}
        onClose={onClose2}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose2}>
                Cancel
              </Button>
              <Button colorScheme='teal' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </>
  )
}
