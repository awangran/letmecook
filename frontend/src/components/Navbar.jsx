import React from 'react'
import { Button, Flex, Heading, HStack, Icon, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";


export default function Navbar({ heading, onOpen, btnRef }) {
  

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
        
        <Heading fontSize='40px' color='teal' >{heading}</Heading>

        <Spacer />

        <Link to='/cart'>
            <Icon as={MdOutlineShoppingCart} fontSize='35px' mx={8}
            sx={{
              color: 'teal',
              transition: '.3s',
              _hover: { color: 'teal.300', cursor: 'pointer'  },  // Hover styles
          }}
            />
        </Link>

        <span>
        <Icon as={MdAddCircleOutline} fontSize='35px' onClick={onOpen} ref={btnRef}
          sx={{
            color: 'teal',
            transition: '.3s',
            _hover: { color: 'teal.300', cursor: 'pointer'  },  // Hover styles
        }}
        />     
        </span>

        

      </Flex>
  )
}
