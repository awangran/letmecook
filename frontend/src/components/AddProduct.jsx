import React from 'react'
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
              onSubmit={(e) => {
                e.preventDefault()
                console.log('submitted')
              }}
              >
            
                <Flex direction='column' my={2}>
                    <FormLabel htmlFor='product'>Product Name</FormLabel>
                    <Input id='product' />
                </Flex>

                <Flex direction='column' my={2}>
                    <FormLabel htmlFor='quantity'>Quantity</FormLabel>
                    <Flex gap={2}>
                        <NumberInput >
                            <NumberInputField id='number' />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <Select id='unit' defaultValue='und'>
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
                    <Input id="dateIn" size='md' type='date'/>

                    <FormLabel htmlFor='dateIn' my={3}>Date Out</FormLabel>
                    <Input id="dateOut" size='md' type='date'/>
                </Flex>

                <Flex direction='column' my={3}>
                    <FormLabel htmlFor='type'>Type</FormLabel>
                    <Select id='type' defaultValue='protein'>
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
                        <Input type='number' />
                    </InputGroup>

                    
                </Flex>




              
              
              </form>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='teal' type='submit' form='add-form'>Add</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

export default AddProduct