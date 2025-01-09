import React from 'react'
import { Button, Flex, Heading, HStack, Icon, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoRefresh } from 'react-icons/io5';

function Navbar() {
  return (
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
        
        <Heading fontSize='40px' color='teal' >Search</Heading>

        <Spacer />

        <Link to='/cart'>
            <Icon as={MdOutlineShoppingCart} fontSize='35px' mr={8}
            sx={{
              color: 'teal',
              transition: '.3s',
              _hover: { color: 'teal.300', cursor: 'pointer'  },  // Hover styles
          }}
            />
        </Link>
        <Link>
        <Icon as={IoRefresh} fontSize='35px' 
            sx={{
              color: 'teal',
              transition: '.3s',
              _hover: { color: 'teal.300', cursor: 'pointer'  },  // Hover styles
          }}
            />
        </Link>

        
        
    </Flex>
  )
}

export default Navbar