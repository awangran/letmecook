import { Box, Button, Flex, Heading, HStack, IconButton} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TbFridge } from "react-icons/tb";
import { PiBowlFoodBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';



function Home() {

  return (
    <Flex minWidth='100vw' minHeight='100vh' alignItems='center' justify='center' direction='column'>
        <Heading color='black'>Let me Cook</Heading>
        <HStack mt={10} gap={10}>
          <Link to='/fridge'>
              <IconButton color='black' aria-label='Fridge' icon={<TbFridge />} size='lg' padding='50px 30px' fontSize='50px' />
          </Link>
          <Link to='/recipes'>
            <IconButton color='black' aria-label='Recipes' icon={<PiBowlFoodBold />} size='lg' padding='50px 30px' fontSize='50px'/>
          </Link>
          <Link to='/search'>
            <IconButton color='black' aria-label='Search' icon={<IoMdSearch />} size='lg' padding='50px 30px' fontSize='50px'/>
          </Link>
        
        </HStack>

    </Flex>
  )
}

export default Home