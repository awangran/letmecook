import { Box, Button, Card, CardBody, Flex, FormLabel, Heading, Input, List, ListItem, Select, Text } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5'

function SaveRecipe({showSave, setShowSave, recipe, products, showAlert}) {
    const [name, setName] = useState(recipe.title);
    const [filteredInput, setFilteredInput] = useState(products.map((obj) => obj.product));
    const [inputValue, setInputValue] = useState("");
    const [selectedCardId, setSelectedCardId] = useState(null);

    const rawingredients = [...recipe.missedIngredients, ...recipe.usedIngredients]
    const [ingredients, setIngredients] = useState(rawingredients)

    const productsName = products.map((obj) => obj.product)

    const rawtime = [recipe.preparationminutes, recipe.cookingminutes, recipe.readyInMinutes];
    const tags = [...recipe.cuisines, ...recipe.diets]
    const type = recipe.dishTypes
    const time = rawtime.map((value) => (value === undefined ? 0 : value));
    const image = recipe.image
    const servings = recipe.servings
    const link = recipe.sourceUrl
    const notes = ' '

    const units = [
        "unit", "teaspoon", "tablespoon", "cup", "ounce", "pound", "gram", "kilogram", "milliliter", "liter", "pinch", "dash", "quart", "gallon", "sheet", "bottle", "slice"
    ]
    //function for handling diff ing ids
    const handleIngredientName = (key) => {
        const foundIngredient = ingredients.find(item => item.id === key);
        return foundIngredient.name
    }

    //function for ingredient suggestions and input change field
    const handleInputChange = (e, id) => {
        const newValue = e.target.value

        setIngredients((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, name: newValue } : item
            )
        );
        
        setFilteredInput(
            productsName.filter((product) =>
            product.toLowerCase().includes(newValue.toLowerCase())
          )
        );
        toggleCard(id);
      };

      //handle quantiy input fiekd
      const handleNumberChange = (e, id) => {
        const newValue = Number(e.target.value)

        setIngredients((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, amount: newValue } : item
            )
        );
      }

      //handle units input field
      const handleUnitChange = (e, id) => {
        const newValue = e.target.value
        setIngredients((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, unit: newValue } : item
            )
        );
      }

      const handleOptionClick = (option, id) => {
        setIngredients((prevItems) =>
        prevItems.map((item) =>
            item.id === id ? { ...item, name: option } : item
        )
        );
        toggleCard(id); 
      };

      const handleBlur = (id) => {
        setTimeout(() => toggleCard(id), 100); // Delay to allow option selection
      };

      const toggleCard = (id) => {
        setSelectedCardId((prevId) => (prevId === id ? null : id));
      };

      const handleSubmit = () => {
        

        const data = {
          name,
          type,
          time,
          ingredients,
          servings,
          link,
          tags,
          image,
          notes
        };
        axios
          .post('http://localhost:5555/recipes', data)
          .then(() => {
            showAlert("success", "Recipe added");
            setShowSave(!showSave)
          })
          .catch((err) => {
            showAlert('error', 'Check console.')
            console.log(err)
            console.log(data)
          });
      };
    
      //testing
     

  return (
    <>
    <Flex
        width='100%'
        height='100%' 
        position='absolute' 
        top='0' 
        justifyContent='center'
        alignContent='center'
        alignItems='center'
        zIndex='10'
        left='0'
        >
        <Flex height='fit-content' overflowY='scroll' >
        <Card>
        <Flex justifyContent='right' alignContent='center' m={2}>
            <IoClose
            fontSize='30px'
            color='gray'
            onClick={()=> setShowSave(!showSave)}
            />
        </Flex>
        <CardBody>
            <Heading color='teal' fontSize='25px' textAlign='center'>Save Recipe</Heading>
            <Text mt={2} textAlign='center'>Edit fields before saving</Text>

            <FormLabel htmlFor='name' my={3} color='teal' fontWeight='bold'>Name</FormLabel>
            <Input id="name" size='md' placeholder={recipe.title} type='text' onChange={(e) => {setName(e.target.value)}}  backgroundColor='white' variant='filled' border='solid' borderWidth='thin' borderColor='gray' />

            <FormLabel htmlFor='ingredients' my={3} color='teal' fontWeight='bold'>Ingredients</FormLabel>
            <Flex direction='column' gap={2}>
                {rawingredients.map((item) => (
                    <Flex gap={2}>
                     <Box position="relative" key={item.id} >
                     <Input
                            value={handleIngredientName(item.id)}
                            placeholder={item.name}
                            onChange={(e) => handleInputChange(e, item.id)}
                            onFocus={() => toggleCard(item.id)}
                            onBlur={() => handleBlur(item.id)}

                         />
                         {selectedCardId === item.id && (
                                 <List
                                 position="absolute"
                                 width="fit-content"
                                 bg="white"
                                 border="1px solid"
                                 borderColor="gray.200"
                                 borderRadius="md"
                                 maxHeight="150px"
                                 overflowY="auto"
                                 zIndex="9"
                                 mt={4}
                                 >
                                 {selectedCardId === item.id && (
                                     filteredInput.map((ingredient) => (
                                     <ListItem
                                     key={ingredient}
                                     px={4}
                                     py={2}
                                     cursor="pointer"
                                     _hover={{ bg: "gray.100" }}
                                     onClick={() => handleOptionClick(ingredient, item.id)}
                                     zIndex="10"
                                     >
                                     {ingredient}
                                     </ListItem>
                                    ))
                                 )}
                                 </List>
                             )}
                         </Box>

                         <Input size='sm' width={10} placeholder={item.amount} type='number' borderRadius={5} backgroundColor='white' variant='filled' border='solid' borderWidth='thin' borderColor='gray.100'
                         onChange={(e) => handleNumberChange(e,item.id)}
                         />
                         <Select size='sm' placeholder={item.unit} width={20} color='gray.600' onChange={(e) => handleUnitChange(e, item.id)}>
                             {
                                 units.map((unit) => (
                                     <option key={unit} value={unit}>{unit}</option>
                                 ))
                             }
                         </Select>
                         </Flex>
                         
                ))}
            </Flex>
            <Flex justifyContent='center'><Button colorScheme='teal' m={4} onClick={() => handleSubmit()}>Save</Button></Flex>
        </CardBody>
        </Card>
        </Flex>
    </Flex>
    </>
  )
}

export default SaveRecipe