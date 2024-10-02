import React, { useState } from 'react'
import axios from 'axios'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    FormLabel,
    Box,
    Select,
    Flex,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputLeftElement,
    InputGroup
  } from '@chakra-ui/react'


  function AddProduct({ isOpen, onClose, btnRef }) {
    const [product, setProduct] = useState()
    const [number, setNumber] = useState()
    const [unit, setUnit] = useState()
    const [dateIn, setDatein] = useState()
    const [dateOut, setDateout] = useState()
    const [type, setType] = useState()
    const [cost, setCost] = useState()
    const [stock, setStock] = useState()

    const handleStock = () => {
      if (number > 0){
        setStock(true)
      } else {
        setStock(false)
      }
    }

    

    const quantity = {
      number: number,
      unit: unit
    };




    const handleAdd = () => {

      handleStock()
      
      const data = {
        product,
        quantity,
        cost,
        dateIn,
        dateOut,
        type,
        stock
      };
      axios
        .post('http://localhost:5555/fridge', data)
        .catch((err) => {
          alert('Error happened. Check console.')
          console.log(err)
          console.log(data)
        });
    };


    return (
      <>
        
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color='teal'>Add Product</DrawerHeader>
  
            <DrawerBody px={10}  >
              <form
              id='add-form'
             
              >
            
                <Flex direction='column' my={2}>
                    <FormLabel htmlFor='product'>Product Name</FormLabel>
                    <Input id='product' onChange={(e) => setProduct(e.target.value)}/>
                </Flex>

                <Flex direction='column' my={2}>
                    <FormLabel htmlFor='quantity'>Quantity</FormLabel>
                    <Flex gap={2}>
                        <NumberInput >
                            <NumberInputField id='number' onChange={(e) => setNumber(e.target.value)} />
                        </NumberInput>
                        <Select id='unit' onChange={(e) => setUnit(e.target.value)}>
                            <option value='und'>und</option>
                            <option value='kg'>kg</option>
                            <option value='grams'>grams</option>
                            <option value='liters'>liters</option>
                            <option value='ml'>mL</option>
                            <option value='ml'>ounce</option>
                            <option value='piece'>piece</option>
                            <option value='cup'>cup</option>
                            <option value='tbsp'>tablespoon</option>
                            <option value='tsp'>teaspoon</option>
                        </Select>
                    </Flex>
                </Flex>

                <Flex direction='column' mb={2}> 
                    <FormLabel htmlFor='dateIn' my={3}>Date In</FormLabel>
                    <Input id="dateIn" size='md' type='date' onChange={(e) => setDatein(e.target.value)}/>

                    <FormLabel htmlFor='dateIn' my={3}>Date Out</FormLabel>
                    <Input id="dateOut" size='md' type='date' onChange={(e) => setDateout(e.target.value)}/>
                </Flex>

                <Flex direction='column' my={3}>
                    <FormLabel htmlFor='type'>Type</FormLabel>
                    <Select id='type' onChange={(e) => setType(e.target.value)}>
                        <option value='protein'>Protein</option>
                        <option value='dairy'>Dairy</option>
                        <option value='grains'>Grains</option>
                        <option value='vegetables'>Vegetables</option>
                        <option value='grains'>Fruits</option>
                        <option value='pantry'>Pantry</option>
                        <option value='grains'>Snacks</option>
                        <option value='grains'>Sweets</option>
                                
                    </Select>
                </Flex>
                <Flex direction='column' my={2}>
                    <FormLabel htmlFor='cost'>Cost</FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                        $
                        </InputLeftElement>
                        <Input type='number' onChange={(e) => setCost(e.target.value)}/>
                    </InputGroup>

                    
                </Flex>

              
        
              </form>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='teal' onClick={handleAdd}>Add</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default AddProduct