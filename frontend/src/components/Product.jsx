import React, { useState } from 'react'
import { GiPlainCircle } from "react-icons/gi";
import { MdEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { Box, Text, Flex } from '@chakra-ui/react'
import { MdOutlineAddShoppingCart } from "react-icons/md";



export default function Product({ product, quantity }) {
    const [show, setShow] = useState(false);
   

  return (
    <Box p={2} border='2px' borderColor='teal' width='230px' borderRadius='10px'>
        <Flex alignItems='center' justifyContent='space-between' onClick={()=> setShow(!show)}>
            <Text fontWeight='600'>{product.product}</Text> 
            
            <Flex alignItems='center' gap={2}> 
                <Text>{product.stock}</Text>
                <GiPlainCircle color='teal' />
            </Flex>

            

        </Flex>

        <Flex alignItems='end' justifyContent='space-between'>
            <Flex direction='column'>
                <Text>{product.quantity.number} {product.quantity.unit}</Text>
                {show && (
                <>
                    <Text><b>In:</b>{product.dateIn}</Text>
                    <Text><b>Out:</b>{product.dateOut}</Text>
                    <Text><b>Cost:</b>{product.cost}</Text>
                </>
                )}
                    
            </Flex>

            <Flex gap={2}>
                <MdOutlineAddShoppingCart />
                <MdEdit/>
                <FiTrash/>
            </Flex>

        </Flex>
    </Box>
  )
}
