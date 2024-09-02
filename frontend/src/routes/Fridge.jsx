import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FridgeLevel from '../components/FridgeLevel'
import AddProduct from '../components/AddProduct'
import { useDisclosure } from '@chakra-ui/react'
import axios from 'axios'

function Fridge() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [products, setProducts] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5555/fridge')
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  } )

  return (
    <>
      <Navbar onOpen={onOpen} btnRef={btnRef} heading='Fridge'/>
      <FridgeLevel products={products}/>
      <AddProduct isOpen={isOpen} onClose={onClose} btnRef={btnRef}  heading='Fridge Level' />
    </>

  )
}

export default Fridge