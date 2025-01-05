import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Recipe from '../components/recipe/Recipe'
import { Alert, AlertIcon, Box, CloseButton, Flex, Heading, Icon, Slide, Spacer, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import AddRecipe from '../components/recipe/AddRecipe'
import { Link } from 'react-router-dom'
import { GrHomeRounded } from 'react-icons/gr'
import { MdAddCircleOutline, MdOutlineShoppingCart } from 'react-icons/md'
import { v4 as uuid } from 'uuid';


function Recipes() {

  const [recipes, setRecipes] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [queue, setQueue] = useState([]);

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


  // Function to add an alert to the queue
  const showAlert = (status, message) => {
    const id = uuid();
    setQueue((prev) => [...prev, { id, status, message }]);
  };

  // Effect to process the queue
  useEffect(() => {
    if (queue.length > 0 && alerts.length === 0) {
      const nextAlert = queue[0];
      setAlerts([nextAlert]); // Show the next alert

      // Remove the alert after 3 seconds
      setTimeout(() => {
        setAlerts([]);
        setQueue((prev) => prev.slice(1)); 
      }, 3000);
    }
  }, [queue, alerts]);

  return (
    <>
    
    <Flex minWidth='100vw' py={16} px={20} alignItems='center'>
      {/* Alert Container */}
      <Box position="fixed" top="10px" right="10px" zIndex="1000">
        {alerts.map((alert) => (
          <Slide key={alert.id} direction="top" in={true}>
            <Alert status={alert.status} borderRadius="md" boxShadow="md" mb={4}>
              <AlertIcon />
              {alert.message}
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setAlerts((prev) => prev.filter((a) => a.id !== alert.id))}
              />
            </Alert>
          </Slide>
        ))}
      </Box>

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
      mx={20}
      >
        {recipes.map((recipe) => (
          <Recipe key={recipe._id} recipe={recipe} fetchRecipes={fetchRecipes} recipes={recipes} showAlert={showAlert}/>
        ))}
       
      </Flex>
      {isOpen && (
        <AddRecipe fetchRecipes={fetchRecipes} toggleOpen={toggleOpen} isOpen={isOpen} showAlert={showAlert}/>
      )}
      
    </>
  )
}

export default Recipes