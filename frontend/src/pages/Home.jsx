import { Box, Button, Flex, Heading, HStack, IconButton, Link } from "@chakra-ui/react";
import { TbFridge } from "react-icons/tb";
import { PiBowlFoodBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";



function Home() {
  return (
    <Flex minWidth='100vw' minHeight='100vh' alignItems='center' justify='center' direction='column'>
        <Heading color='black'>Let me Cook</Heading>
        <HStack mt={10} gap={10}>
        <IconButton color='black' aria-label='Fridge' icon={<TbFridge />} size='lg' padding='50px 30px' fontSize='50px'>
        </IconButton>
        <IconButton color='black' aria-label='Recipe' icon={<PiBowlFoodBold />} size='lg' padding='50px 30px' fontSize='50px'/>
        <IconButton color='black' aria-label='Fridge' icon={<IoMdSearch />} size='lg' padding='50px 30px' fontSize='50px'/>

                
            
        </HStack>

    </Flex>
  )
}

export default Home