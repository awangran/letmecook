import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Recipe from '../components/recipe/Recipe'
import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import AddRecipe from '../components/recipe/AddRecipe'

function Recipes() {

  const [recipes, setRecipes] = useState([])
  // Fetch recipes from the API
  const fetchProducts = () => {
    axios
      .get('http://localhost:5555/recipes')
      .then((res) => {
        setRecipes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetch recipes when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    
      <Navbar heading='Recipes'/>
      <Flex 
      wrap="wrap" 
      gap={6} 
      justifyContent="flex-start" 
      mx={20}
      >
        {recipes.map((recipe) => (
          <Recipe key={recipe._id} recipe={recipe} />
        ))}
       
      </Flex>
      <AddRecipe/>
    </>
  )
}

export default Recipes