import React from 'react'
import { Flex, Box, Heading} from '@chakra-ui/react'
import Product from './Product'

function FridgeLevel({ products, fetchProducts }) {

  const levelTypes = [...new Set(products.map(product => product.type))]
  
  const grouped = levelTypes.map(type => ({
    type,
    products: products.filter(product => product.type === type),
  }));

  return (
    <>
      <Box>
        {grouped.map((group) => (
          <Box key={group.type} px={20} >
            <Heading fontSize='30px' my={8} color='teal'>{group.type.charAt(0).toUpperCase() + group.type.slice(1)}</Heading>
            <Flex 
            wrap="wrap" 
            gap={6} 
            justifyContent="flex-start" 
            >

            {group.products.map((item) => (
               <Product key={item._id} product={item} fetchProducts={fetchProducts}/>

            ))}
            </Flex>
          </Box>

        ))}
      </Box>

    </>
  )
}

export default FridgeLevel
