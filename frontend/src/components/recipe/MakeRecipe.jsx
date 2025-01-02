import { Badge, Box, Button, Flex, Heading, Input, MenuItem, Select, SimpleGrid, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { IoClose, IoTrash,IoCloseCircle } from 'react-icons/io5'
import { IoMdCheckmark } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { TbApple, TbFridge, TbWeight } from "react-icons/tb";
import { MdNumbers } from "react-icons/md";
import { useState } from 'react';
import { BsCartX } from "react-icons/bs";
import { RiExchangeBoxLine } from "react-icons/ri";
import { useEffect } from 'react';
import axios from 'axios';


function MakeRecipe({recipe, setShowMake, showMake, ingredients, products}) {
    const units = [
        "unit", "teaspoon", "tablespoon", "cup", "ounce", "pound", "gram", "kilogram", "milliliter", "liter", "pinch", "dash", "quart", "gallon", "sheet", "bottle", "slice"
    ]
    const [infridge, setInFridge] = useState('')
    const [newIngredients, setNewIngredients] = useState(ingredients)

    //function for calculating if able to make each ingredient

    function checkThisIngredient(ingredient, products) {
        const matchingProduct = products.find(
            product => product.product === ingredient.name
          );
        if (!matchingProduct || matchingProduct.quantity.number == 0) {
            return(IoCloseCircle)
        }
        if (matchingProduct.quantity.number < ingredient.number && matchingProduct.quantity.number > 0 ){
            return(BsCartX)
        }
        if (matchingProduct.quantity.unit !== ingredient.unit) {
            return(RiExchangeBoxLine)
        }
        return(IoMdCheckmark);
    }

    //function for handling number change
    function changeNumber(newNumber, ingredient) {
        setNewIngredients((prevIngredients) =>
            prevIngredients.map((i) =>
                i.name === ingredient.name ? { ...i, number: newNumber } : i
            )
        
        );
    }

    //make recipe function
    const makeRecipe = () => {
        for (const ingredient of newIngredients) {
            const matchingProduct = products.find(
                product => product.product === ingredient.name
            );
            //check that they are the same unit and that product stock is not zero
            if (matchingProduct.quantity.unit === ingredient.unit && matchingProduct.quantity.number > 0) {
                console.log(matchingProduct)
                const {_id:id, product, cost, dateIn, dateOut, type} = matchingProduct;
                const quantity = {
                        number: Math.max(0, matchingProduct.quantity.number - ingredient.number),
                        unit: matchingProduct.quantity.unit,
                      }
                const stock = quantity.number === 0 ? false : true;
                useProduct(id, product, quantity, cost, dateIn, dateOut, type, stock)

                //add later error handling
            }

        }

    }

    const useProduct = (id, product, quantity, cost, dateIn, dateOut, type, stock) => {
        
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
        .put(`http://localhost:5555/fridge/${id}`, data)
        .then(() => {
            alert("product updated")
        })
        .catch((err) => {
            alert('Error happened. Check console.')
            console.log(err)
            console.log(data)
        });
    };
    
      
    //for debugging
    useEffect(() => {
        console.log(newIngredients)
    }, [newIngredients]);

    //function for handling unit change
    function changeUnit(newUnit, ingredient) {
        setNewIngredients((prevIngredients) =>
            prevIngredients.map((i) =>
                i.name === ingredient.name ? { ...i, unit: newUnit } : i
            )
        
        );
    }

    function deleteIngredient(ingredient){
        setNewIngredients(
            newIngredients.filter(item => item.name !== ingredient.name),
        )
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
            {newIngredients.map((item, index) => (
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
                    placeholder={item.number}
                    defaultValue={item.number}
                    size="sm"
                    width="50px"
                    borderRadius={4}
                    type='number'
                    onChange={(e) => changeNumber(Number(e.target.value),item)}
                />
                <Select
                    size="sm"
                    width={20}
                    defaultValue={item.unit}
                    color="gray.600"
                    onChange={(e) => changeUnit((e.target.value),item)}
                >
                    {units.map((unit, unitIndex) => (
                    <option key={unitIndex} value={unit}>
                        {unit}
                    </option>
                    ))}
                </Select>
                <Box as={checkThisIngredient(item, products)} /> 
                <Box as={FaWandMagicSparkles} cursor="pointer" />
                <Box as={IoTrash} cursor="pointer" onClick={(e) => deleteIngredient(item)}/>
                </Flex>
            ))}
            </SimpleGrid>
            
            <Flex gap={4} justifyContent='center' my={4}>
                <Button colorScheme='teal' variant='solid' onClick={makeRecipe}>Make</Button>
                <Button colorScheme='teal' variant='outline'>Close</Button>
            </Flex>
        </Flex>
    </Flex>
    </>
  )
}

export default MakeRecipe
