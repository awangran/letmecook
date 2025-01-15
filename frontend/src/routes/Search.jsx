import React, { useEffect, useState } from 'react'
import { Alert, AlertIcon, Box, Button, CloseButton, filter, Flex, Heading, HStack, Icon, Slide, Spacer } from '@chakra-ui/react'
import Searchbar from '../components/search/Searchbar';
import axios from 'axios';
import Navbar from '../components/search/Navbar';
import RecipeCard from '../components/search/RecipeCard';
import { v4 as uuid } from 'uuid';

function Search() {
  const [recipes, setRecipes] = useState([]);
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState();
  const [includeingredients, setIncludeingredients] = useState(ingredients);
  const [filterprops, setFilterProps] = useState();
  const [propArray, setPropArray] = useState([]);

  const [alerts, setAlerts] = useState([]);
  const [queue, setQueue] = useState([]);

  //Fetch products from db
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

  // Fetch products when the component mounts
    useEffect(() => {
      fetchProducts();
    }, []);
   
  //after products load, set ingredients
  useEffect(() => {
    if (products.length > 0) {
      setIngredients(products.map(obj => obj.product))     
    } 
  }, [products]);

  //take properties and turn them into string
  const requestString = () => {
    if (ingredients !== undefined) {
      const excludearray = filterprops.excludeIngredients || [];
      const includeingredients = ingredients.filter(
        item => !excludearray.includes(item)
      );
      filterprops.includeIngredients = includeingredients;

      setPropArray(() => {
        const newPropArray = [];
        for (const p in filterprops) {
          if (filterprops[p]?.length > 0) {
            if (Array.isArray(filterprops[p])) {
              const stringified = filterprops[p]
                .map(item => item.toLowerCase())
                .toString();
              newPropArray.push(`${p}=${stringified}`);
            } else {
              newPropArray.push(`${p}=${filterprops[p].toLowerCase()}`);
            }
          }
        }
        return newPropArray;
      });
    }
  };


  //when filter props is processed, call the fetch
  useEffect(() => {
    if (filterprops !== undefined){
      requestString()
    }
  }, [filterprops])
 
  //call fetch function after getting the props array
  useEffect(() => {
    const propString = propArray.toString();
    if (propString !== '' || propString !== undefined){
      fetchRecipes(propString);
    }
  }, [propArray])


  //ORIGINAL FETCH FUNCTIONNNN
  //Fetch recipes from spoonocular api after ingredients load
  const fetchRecipes = (propString) => {
    // Fetch from API if not in local storage
    const apiKey = import.meta.env.VITE_API_KEY;
      //.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${filterprops}&fillIngredients=true&addRecipeInformation=true&sort=min-missing-ingredients&number=1`)

    if (propString !== '') {
      console.log(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${propString}&fillIngredients=true&addRecipeInformation=true&sort=min-missing-ingredients&number=1`)
      axios
      .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${propString}&fillIngredients=true&addRecipeInformation=true&sort=min-missing-ingredients&number=5`)
      .then((res) => {
        setRecipes(res.data.results);
        console.log('recipe fetched')
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }; 
   
/* 
  //TESTING FETCH FUNCTION
  const fetchRecipes = (propString) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const localStorageKey = "firstRecipe";
  
    // Check if the first recipe is already in localStorage
    const savedRecipe = localStorage.getItem(localStorageKey);
    if (savedRecipe) {
      console.log("Using cached recipe from localStorage");
      setRecipes([JSON.parse(savedRecipe)]);
      return;
    }
  
    if (propString !== "") {
      axios
        .get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${propString}&fillIngredients=true&addRecipeInformation=true&sort=min-missing-ingredients&sort=popularity&number=1`
        )
        .then((res) => {
          const fetchedRecipes = res.data.results;
  
          if (fetchedRecipes && fetchedRecipes.length > 0) {
            // Save the first recipe to localStorage
            localStorage.setItem(localStorageKey, JSON.stringify(fetchedRecipes[0]));
  
            // Set the recipes in state
            setRecipes(fetchedRecipes);
            console.log("Recipe fetched and saved to localStorage");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }; 
 */
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
  
  //testing
  useEffect(() => {
    console.log(recipes)
  }, [recipes])
  

  return (
    <>
    <Navbar/>
    <Flex justifyContent='center' width='100%'>
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

    <Searchbar products={products} setFilterProps={setFilterProps} fetchRecipes={fetchRecipes} ingredients={ingredients}/>
    </Flex>
    <Flex wrap="wrap" 
      gap={6} 
      justifyContent="flex-start" 
      mx={20}
      my={10}
      >
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} products={products} showAlert={showAlert}/>
        ))
      ) : (
        <p>Loading recipes...</p>
      )}

    </Flex>

    


    
   
    </>
  )
}

export default Search
