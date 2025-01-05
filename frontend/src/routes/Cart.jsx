import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, HStack, Icon, Spacer, Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { GrHomeRounded } from 'react-icons/gr';
import { FiTrash } from 'react-icons/fi';

export default function Cart() {
  //cart array
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cartArray")) || []);
  const [total, setTotal] = useState(0)
  
  //increase and decrease quantity and cost
  const increaseQuantity = (item) => {
    const index = cart.findIndex((element) => element == item)
    let newCart = [...cart]
    newCart[index].quantity += 1
    newCart[index].total = newCart[index].cost * newCart[index].quantity
    setCart(newCart)
    localStorage.setItem("cartArray", JSON.stringify(cart));
  }

  const decreaseQuantity = (item) => {
    const index = cart.findIndex((element) => element == item)
    

    if (cart[index].quantity != 1) {
      const newCart = [...cart]
      newCart[index].quantity -= 1
      newCart[index].total = newCart[index].cost * newCart[index].quantity
      setCart(newCart)
     

    } else {
      const newCart = cart.filter(item => item !== cart[index])
      setCart(newCart)
      localStorage.setItem("cartArray", JSON.stringify(newCart));
    }
  }

  //calculate final total
  useEffect(() => {
    const sum = cart
              .reduce((s, n) => s + n.total, 0)
    setTotal(sum)
  }, [cart]);

  //erase item
  const eraseItem = (product) =>{
      const newCart = cart.filter(item => item !== product)
      setCart(newCart)
      localStorage.setItem("cartArray", JSON.stringify(newCart));
  }
    
  


  return (
    <>

  
    <Flex minWidth='100vw' py={16} px={20} alignItems='center'> 
        <Link to='/'>
          <Icon as={GrHomeRounded}  fontSize='30px' 
          sx={{
            color: 'teal',
            transition: '.3s',
            _hover: { color: 'teal.300', cursor: 'pointer'  },  // Hover styles
        }}
          />
        </Link>

        <Spacer />
        
        <Heading fontSize='40px' color='teal' >Cart</Heading>

        <Spacer />
      </Flex>

      <Flex direction='column' justifyContent='center' px={20}>
        <Card>
          <CardHeader>
            <Heading size='md'>Items</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>

            {cart.map((item) => (
              <HStack justifyContent='space-between' key={item.id}>
                <Box>
                <Heading size='xs' textTransform='uppercase' color='teal'>
                  {item.name} 
                </Heading>
                <Text pt='2' fontSize='sm'>
                  Unit: ${item.cost}
                </Text>
              </Box>
              <Box>
              <HStack maxW='320px'>
                <Button size='sm' onClick={() => {increaseQuantity(item)}}>+</Button>
                <Text>{item.quantity} {item.unit}</Text>
                <Button size='sm' onClick={() => {decreaseQuantity(item)}}>-</Button>
              </HStack>
              
              </Box>
              <HStack>
              <Text px={2}>
                Total cost: ${item.total}
              </Text>
              <Icon as={FiTrash} onClick={() => {eraseItem(item)}} 
                sx={{
                    color: 'grey',
                    transition: '.3s',
                    _hover: { color: 'teal.400', cursor: 'pointer'  },  // Hover styles
                }}
                />
              </HStack>


              </HStack>
               ))}

            </Stack>
          </CardBody>
        </Card>

        <Heading p={2} textAlign='right' size='md' color='teal'>Cart total: ${total}</Heading>

      </Flex>

      
    </>
  )
}
