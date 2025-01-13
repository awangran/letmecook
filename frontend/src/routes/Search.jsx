import React, { useEffect, useState } from 'react'
import { Button, filter, Flex, Heading, HStack, Icon, Spacer } from '@chakra-ui/react'
import Searchbar from '../components/search/Searchbar';
import axios from 'axios';
import Navbar from '../components/search/Navbar';
import RecipeCard from '../components/search/RecipeCard';

function Search() {
  const [recipes, setRecipes] = useState([]);
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState();
  const [includeingredients, setIncludeingredients] = useState(ingredients);
  const [filterprops, setFilterProps] = useState();
  const [propArray, setPropArray] = useState([]);

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


  //Fetch recipes from spoonocular api after ingredients load
  const fetchRecipes = (propString) => {
    // Fetch from API if not in local storage
    const apiKey = import.meta.env.VITE_API_KEY;
      //.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${filterprops}&fillIngredients=true&addRecipeInformation=true&sort=min-missing-ingredients&number=1`)

    if (propString !== '') {
      console.log(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${propString}&sort=min-missing-ingredients&number=1`)
      axios
      .get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&${propString}&sort=min-missing-ingredients&number=1`)
      .then((res) => {
        setRecipes(res.data.results);
        console.log('recipe fetched')
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  
  //testing
  useEffect(() => {
    console.log(recipes)
  }, [recipes])
  

  return (
    <>
    <Navbar/>
    <Flex justifyContent='center' width='100%'>
    <Searchbar products={products} setFilterProps={setFilterProps} fetchRecipes={fetchRecipes} ingredients={ingredients}/>
    </Flex>
    <Flex wrap="wrap" 
      gap={6} 
      justifyContent="flex-start" 
      mx={20}
      my={10}
      >
         
    



    </Flex>


    
   
    </>
  )
}

export default Search
