import React, { useEffect, useState } from 'react'
import { GiPlainCircle } from "react-icons/gi";
import { MdEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { Box, Text, Flex, useDisclosure, Icon } from '@chakra-ui/react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { format } from 'date-fns';
import { differenceInDays } from 'date-fns';
import axios from 'axios';
import EditProduct from './EditProduct';

export default function Product({ product, fetchProducts }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

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
        console.log(id)

        axios
        .delete(`http://localhost:5555/fridge/${id}`)
        .then(() => {
            console.log("product deleted")
            fetchProducts();
        })
        .catch((error) => {
            alert('An error happened. Please Check console');
            console.log(error);
        });
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
            <Icon as={MdOutlineAddShoppingCart} sx={{
                color: 'grey',
                transition: '.3s',
                _hover: { color: 'teal.400', cursor: 'pointer'  },  // Hover styles
            }} />
                <Icon as={MdEdit} onClick={onOpen}
                sx={{
                    color: 'grey',
                    transition: '.3s',
                    _hover: { color: 'teal.400', cursor: 'pointer'  },  // Hover styles
                }}
                />
                <Icon as={FiTrash} onClick={handleDelete}
                sx={{
                    color: 'grey',
                    transition: '.3s',
                    _hover: { color: 'teal.400', cursor: 'pointer'  },  // Hover styles
                }}
                />
            </Flex>

        </Flex>
    </Box>
    <EditProduct isOpen={isOpen} onClose={onClose} fetchProducts={fetchProducts} id={id} />
    </>
  )
}
