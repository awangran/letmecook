import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FridgeLevel from '../components/product/FridgeLevel'
import AddProduct from '../components/product/AddProduct'
import EditProduct from '../components/product/EditProduct'
import { Alert, AlertIcon, Box, CloseButton, Slide, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import { v4 as uuid } from 'uuid';

function Fridge() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [products, setProducts] = useState([])
  const [alerts, setAlerts] = useState([]);
  const [queue, setQueue] = useState([]);
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
      <Navbar onOpen={onOpen} heading='Fridge'/>
      <FridgeLevel products={products} fetchProducts={fetchProducts} showAlert={showAlert}/>
      <AddProduct isOpen={isOpen} onClose={onClose} fetchProducts={fetchProducts}  heading='Fridge Level' showAlert={showAlert}/>

    </>

  )
}

export default Fridge