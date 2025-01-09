import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { FiPhone, FiPhoneIncoming } from 'react-icons/fi'
import { GrSearch, GrSearchAdvanced } from 'react-icons/gr'
import { IoSearch, IoSearchCircle } from 'react-icons/io5'


const Searchbar = () => {
  return (
    <>
    <Flex width='40%'>
    <InputGroup borderRadius={10}>
    <InputLeftElement pointerEvents='none'>
      <IoSearch color='teal' />
    </InputLeftElement>
    <Input type='tel' placeholder='Search recipe' />
    </InputGroup>
    </Flex>
    
    </>
  )
}

export default Searchbar