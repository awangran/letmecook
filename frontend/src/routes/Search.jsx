import React, { useEffect, useState } from 'react'
import { Button, Flex, Heading, HStack, Icon, Spacer } from '@chakra-ui/react'
import Searchbar from '../components/search/Searchbar';
import axios from 'axios';
import Navbar from '../components/search/Navbar';
import RecipeCard from '../components/search/RecipeCard';

function Search() {
  const [recipes, setRecipes] = useState([]);
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState();
  const [ingredientsString, setIngredientsString] = useState('');
  ;
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
   

  //after products load for ingredients
  useEffect(() => {
    if (products.length > 0) {
      setIngredients(products.map(obj => obj.product).join(","))
    } 
  }, [products]);

  useEffect(() => {
    console.log(ingredients)
  }, [ingredients]
  )
/* 
  //Fetch recipes from spoonocular api after ingredients load
  const fetchRecipes = () => {
    // Fetch from API if not in local storage
    const apiKey = import.meta.env.VITE_API_KEY;

    if (ingredients != '') {
      axios
      //.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=1`)
      
      .then((res) => {
        setRecipes(res.data);
        console.log(recipes);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };
  
  useEffect(() => {
    fetchRecipes();
  }, [ingredients]); // re runs when ingredients change
  
 */

  return (
    <>
    <Navbar/>
    <Flex justifyContent='center' width='100%'>
    <Searchbar products={products} />
    </Flex>
    <Flex wrap="wrap" 
      gap={6} 
      justifyContent="flex-start" 
      mx={20}
      my={10}
      >

  {recipes.map((recipe) => (
      <RecipeCard recipe={recipe} key={recipe.id}/>
    ))}

    </Flex>

    
    

    </>
  )
}

export default Search
