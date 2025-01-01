import { Badge, Box, Button, Flex, Heading, HStack, Img, Text } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { GiPlainCircle } from 'react-icons/gi'
import { IoClose } from "react-icons/io5";
import { IoTrash } from "react-icons/io5";
import RecipeInfo from './RecipeInfo';
import EditRecipe from './EditRecipe';
import MakeRecipe from './MakeRecipe';


function Recipe({recipe, fetchRecipes, recipes}) {

    //Open recipe info
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [showMake, setShowMake] = useState(false)
    const [canmake, setCanmake] = useState('#ffffff')
    const tags = recipe.tags
    const ingredients = recipe.ingredients
    const times = recipe.time
    const [products, setProducts] = useState([])
    const id = recipe._id


    // Fetch products from the API
    const fetchProducts = () => {
        axios
        .get('http://localhost:5555/fridge')
        .then((res) => {
            setProducts(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    // Fetch recipes when the component mounts
    useEffect(() => {
        fetchRecipes();
        fetchProducts();
    }, []);

    
     useEffect(() => {
        if (products.length > 0) {
            checkIngredients(ingredients, products);
        }
    }, [products]);

    //function for calculating if able to make
    function checkIngredients(ingredients, products) {
        if (!Array.isArray(ingredients) || !Array.isArray(products)) {
          throw new Error("Both ingredients and products should be arrays.");
        }
      
        for (const ingredient of ingredients) {
          const matchingProduct = products.find(
            product => product.product === ingredient.name && product.quantity.unit === ingredient.unit
          );
          //checks if the found product exists and is greater than 0
          if (!matchingProduct || matchingProduct.quantity.number == 0) {
            setCanmake('#9B2C2C') 
            return;
          }
          //checks if the found product number is less than the recipe requires
          if (matchingProduct.quantity.number < ingredient.number && matchingProduct.quantity.number > 0) {
            setCanmake("#F6AD55"); 
            return;
          }
        }
        setCanmake('#9AE6B4'); // All ingredients are available with sufficient stock
      }

    //handle recipe delete
    const handleDelete = () => {

        axios
        .delete(`http://localhost:5555/recipes/${id}`)
        .then(() => {
            console.log("recipe deleted")
            fetchRecipes();
        })
        .catch((error) => {
            alert('An error happened. Please Check console');
            console.log(error);
        });
    }
      

  return (
    <>
    

    <Flex margin={2} p={4} border='solid' borderRadius='10px' borderColor='teal' width='fit-content' height='fit-content' >
        <HStack>
            <Flex>
                <Img 
                src='https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0749D9BC-260D-40F4-A07F-54814C4A82B4/Derivates/A73A7793-F3EE-4B90-ABA4-1CC1A0C3E18F.jpg' 
                alt='Sushi'
                boxSize='130px'
                objectFit='cover'
                borderRadius={10}
                >

                </Img>
            </Flex>
            <Flex direction='column'>
                <Flex alignItems='center' gap={2} justifyContent='space-between' >
                    <Text fontWeight='600' fontSize='xl' color='teal'>{recipe.name}</Text>
                    <GiPlainCircle color={canmake} />
                </Flex>
                <Text>Time: {times[2]} min</Text>
                <Flex gap={2} direction='row' my={2}>
                    {tags.map((tag) => (
                         <Badge colorScheme='teal'>{tag}</Badge>
                    ))}
                   
                    
                </Flex>
                <Box>
                    <Button mr={2} colorScheme='teal' onClick={()=> setShow(!show)}>Read</Button>
                    <Button colorScheme='teal' variant='outline' onClick={()=> setShowMake(!showMake)}>Make</Button>
                </Box>

            </Flex>
        </HStack>
    </Flex>

    {show && (
        <RecipeInfo recipe={recipe} canmake={canmake} tags={tags} times={times} ingredients={ingredients}
        setShow={setShow} show={show} setShow2={setShow2} show2={show2}
        />
    )}

    {show2 && (
        <EditRecipe recipe={recipe} canmake={canmake} tags={tags} times={times} ingredients={ingredients}
        setShow2={setShow2} show2={show2} fetchRecipes={fetchRecipes}
        />
    )}

    {showMake && (
        <MakeRecipe recipe={recipe} setShowMake={setShowMake} showMake={showMake} ingredients={ingredients}
        products={products}
        />
    )}

    


    </>
  )
}

export default Recipe