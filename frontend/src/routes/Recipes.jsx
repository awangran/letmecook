import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Recipe from '../components/recipe/Recipe'
import { Flex, Heading, Icon, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import AddRecipe from '../components/recipe/AddRecipe'
import { Link } from 'react-router-dom'
import { GrHomeRounded } from 'react-icons/gr'
import { MdAddCircleOutline, MdOutlineShoppingCart } from 'react-icons/md'


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
        
        <Heading fontSize='40px' color='teal' >Recipes</Heading>

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
        <Icon as={MdAddCircleOutline} fontSize='35px' onClick={toggleOpen}
          sx={{
            color: 'teal',
            transition: '.3s',
            _hover: { color: 'teal.300', cursor: 'pointer'  },  // Hover styles
        }}
        />     
        </span>
        
      </Flex>
      <Flex 
      wrap="wrap" 
      gap={6} 
      justifyContent="flex-start" 
      width='100%'
      height='100vh'
      px={10}
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