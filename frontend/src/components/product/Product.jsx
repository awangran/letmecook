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
import { FaBowlRice,FaCarrot } from "react-icons/fa6";
import { GiChipsBag,GiWrappedSweet,GiSaltShaker,GiMilkCarton,GiMeat,GiFruitBowl } from "react-icons/gi";
import { HiArchiveBox, HiArchiveBoxXMark } from "react-icons/hi2";
import { CiInboxIn, CiInboxOut, CiMoneyBill } from "react-icons/ci";
import { RiDrinks2Fill } from "react-icons/ri";


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
    const datein = format(dateinraw, 'P')
    const dateoutraw = product.dateOut
    const dateout = format(dateoutraw, 'P')
    const id = product._id

    const [qualityColor, setQualityColor] = useState()
    const [stockstatus, setStock] = useState()
    const [icon, setIcon] = useState()
    const [stockcolor, setStockColor] = useState()

    const [hover, setHover] = useState(false)


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

    const stockMap = {
        instock: HiArchiveBox,
        nostock: HiArchiveBoxXMark
    }
    const calculateStock = () => {
        const stock = product.stock
        setStock(stock ? 'instock' : 'nostock')
        setStockColor(stock ? '#7ad6cd' : '#bad1cf')
    }

    const StockComponent = stockMap[stockstatus];


    const iconMap = {
        meat: GiMeat,
        milk: GiMilkCarton,
        rice: FaBowlRice,
        carrot:FaCarrot,
        fruit: GiFruitBowl,
        salt: GiSaltShaker,
        chips: GiChipsBag,
        sweet: GiWrappedSweet,
        drink: RiDrinks2Fill
      };

    const calculateIcon = () => {
        if (product.type == 'protein'){
            setIcon(`meat`)
        } else if (product.type == 'dairy'){
            setIcon('milk')
        } else if (product.type == 'grains'){
            setIcon('rice')
        } else if (product.type == 'vegetables'){
            setIcon('carrot')
        } else if (product.type == 'fruits'){
            setIcon('fruit')
        } else if (product.type == 'pantry'){
            setIcon('salt')
        } else if (product.type == 'snacks'){
            setIcon('chips')
        } else if (product.type == 'sweets'){
            setIcon('sweet')
        } else if (product.type == 'drinks'){
            setIcon('drink')
        } 
    }
    const IconComponent = iconMap[icon];

     // Set up interval to check the date every day
     useEffect(() => {
        // Call the function when the component mounts
        calculateQuality();
        calculateStock();
        calculateIcon();

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
            showAlert('error', 'An error happened. Check console.');
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
    <Box p={2} border='2px' borderColor='teal' width='130px' height='150px' borderRadius='10px'>
        <Box>
           <Box height='90px' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
           {!hover && (
               <Flex alignItems='center' direction='column' justifyContent='space-between' onClick={()=> setShow(!show)}>
               <Flex alignItems='right' width='100%' justifyContent='space-between' gap={2}>
                   <Icon as={StockComponent} color={stockcolor} />
                   <GiPlainCircle color={qualityColor} />
               </Flex>
               <Icon color='teal' as={IconComponent}  fontSize='35px'>
               </Icon>
   
               <Text fontWeight='600' textAlign='center'>{product.product}</Text> 
               
               <Flex alignItems='center' gap={2}> 
               </Flex>
               </Flex>  
           )}

            {hover && (
            <Flex height='100%' direction='column' p={2}>
                <Flex alignItems='center'>
                    <CiInboxIn fontSize='20px' fontWeight='bold' />
                    <Text ml={2} fontSize='12px'> {datein}</Text>
                </Flex> 
                <Flex alignItems='flex-end' >
                    <CiInboxOut fontSize='20px'/>
                    <Text  ml={2} fontSize='12px'> {dateout}</Text>
                </Flex>
                <Flex alignItems='center' >
                    <CiMoneyBill fontSize='20px'/>
                    <Text ml={2} fontSize='12px'> ${product.cost}</Text>
                </Flex>
                
                
                
            </Flex>
            )}
            </Box>
          
            {!hover && (<Flex alignItems='center' justifyContent='center' mt={4} width='100%' gap={2}>
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
            </Flex>)}

            {hover && (
            <Text fontSize='md' fontWeight='bold' textAlign='center'>{product.quantity.number} {product.quantity.unit}</Text>

            )}


            
        </Box>
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
