import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FridgeLevel from '../components/product/FridgeLevel'
import AddProduct from '../components/product/AddProduct'
import EditProduct from '../components/product/EditProduct'
import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'

function Fridge() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [products, setProducts] = useState([])
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

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <>
      <Navbar onOpen={onOpen} heading='Fridge'/>
      <FridgeLevel products={products} fetchProducts={fetchProducts}/>
      <AddProduct isOpen={isOpen} onClose={onClose} fetchProducts={fetchProducts}  heading='Fridge Level' />

    </>

  )
}

export default Fridge