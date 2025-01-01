import { Badge, Box, Button, Flex, Heading, Input, Select, SimpleGrid, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { IoClose, IoTrash } from 'react-icons/io5'
import { IoMdCheckmark } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { TbApple, TbFridge, TbWeight } from "react-icons/tb";
import { MdNumbers } from "react-icons/md";
import { useState } from 'react';


function MakeRecipe({recipe, setShowMake, showMake, ingredients, products}) {
    const units = [
        "unit", "teaspoon", "tablespoon", "cup", "ounce", "pound", "gram", "kilogram", "milliliter", "liter", "pinch", "dash", "quart", "gallon", "sheet", "bottle", "slice"
    ]
    const [infridge, setInFridge] = useState('')

    //function for calculating if able to make

    function checkThisIngredient(ingredient, products) {
        const matchingProduct = products.find(
            product => product.product === ingredient.name
          );
        if (!matchingProduct || matchingProduct.quantity.number == 0) {
            return('not in stock')
        }
        if (matchingProduct.quantity.number < ingredient.number && matchingProduct.quantity.number > 0 ){
            return('not enough stock')
        }
        if (matchingProduct.quantity.unit !== ingredient.unit) {
            return('wrong units')
        }
        return('yes');
    }

  return (
    <>
    <Flex width='100%' 
    height='100vh' 
    position='absolute' 
    top='0' 
    direction='column'
    px={20}
    py={5}
    zIndex='10'
    alignItems='center'
    >

        <Flex
        width='fit-content'
        height='fit-content'
        backgroundColor='teal.50'
        borderRadius={6}
        boxShadow='23px 18px 20px -18px rgba(191,199,207,0.2);'
        direction='column'
        px={6}
        >
            <Flex justifyContent='right'  pt={4}>
            <IoClose
            fontSize='30px'
            color='teal'
            onClick={()=> setShowMake(!showMake)}
            />
            </Flex>
            <Heading textAlign='center' margin={6} color='teal'>Make Recipe</Heading>
            
            <SimpleGrid columns={{ base: 4, md: 4 }} px={4} py={2} fontSize='20px' color='teal'>
                <Box><TbApple /></Box>
                <Box><MdNumbers /></Box>
                <Box><TbWeight /></Box>
                <Box><TbFridge/> </Box>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4}>
            {ingredients.map((item, index) => (
                <Flex 
                key={index} 
                gap={2} 
                align="center" 
                padding={4} 
                border="1px solid" 
                borderColor="gray.200" 
                borderRadius="md"
                >
                <Text flex="1">{item.name}</Text>
                <Input
                    defaultValue={item.number}
                    size="sm"
                    width="50px"
                    borderRadius={4}
                />
                <Select
                    size="sm"
                    width={20}
                    defaultValue={item.unit}
                    color="gray.600"
                    onChange={(e) => setIunit(e.target.value)}
                >
                    {units.map((unit, unitIndex) => (
                    <option key={unitIndex} value={unit}>
                        {unit}
                    </option>
                    ))}
                </Select>
                <Box> 
                    <Text>{checkThisIngredient(item, products)}</Text>
                </Box>
                <Box as={FaWandMagicSparkles} cursor="pointer" />
                <Box as={IoTrash} cursor="pointer" />
                </Flex>
            ))}
            </SimpleGrid>
            
            <Flex gap={4} justifyContent='center' my={4}>
                <Button colorScheme='teal' variant='solid'>Make</Button>
                <Button colorScheme='teal' variant='outline'>Close</Button>
            </Flex>
        </Flex>
    </Flex>
    </>
  )
}

export default MakeRecipe
