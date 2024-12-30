import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Recipe from '../components/recipe/Recipe'
import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import AddRecipe from '../components/recipe/AddRecipe'


function Recipes() {

  const [recipes, setRecipes] = useState([])
  // Fetch recipes from the API
  const fetchRecipes = () => {
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
    fetchRecipes();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);


  return (
    <>
    
      <Navbar heading='Recipes'/>
      <Text onClick={toggleOpen}>open</Text>
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
      {isOpen && (
        <AddRecipe fetchRecipes={fetchRecipes} toggleOpen={toggleOpen} isOpen={isOpen} />
      )}
      
    </>
  )
}

export default Recipes