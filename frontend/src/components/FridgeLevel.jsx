import React from 'react'
import { SimpleGrid, Box, Heading} from '@chakra-ui/react'
import Product from './Product'

function FridgeLevel({ products }) {
  return (
        <Box px={20}>
                <Heading fontSize='30px' my={8} color='teal'></Heading>

                <SimpleGrid minChildWidth='200px' spacing={10}>
                {products.map((item)=>(
                    <Product key={item._id} product={item}/>
                ))}
                </SimpleGrid>
            </Box>
  )
}

export default FridgeLevel
