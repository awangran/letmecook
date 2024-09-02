import { Box, Button, Flex, Heading, HStack, IconButton} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TbFridge } from "react-icons/tb";
import { PiBowlFoodBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";


function Root() {

  return (
    <Flex minWidth='100vw' minHeight='100vh' alignItems='center' justify='center' direction='column'>
        <Heading color='orange.500'>Let me Cook</Heading>
        <HStack mt={10} gap={10}>
          <Link to='/fridge'>
              <IconButton colorScheme='orange' variant='solid' aria-label='Fridge' icon={<TbFridge />} size='lg' padding='50px 30px' fontSize='50px' />
          </Link>
          <Link to='/recipes'>
            <IconButton colorScheme='orange' variant='solid' icon={<PiBowlFoodBold />} size='lg' padding='50px 30px' fontSize='50px'/>
          </Link>
          <Link to='/search'>
            <IconButton colorScheme='orange' variant='solid' icon={<IoMdSearch />} size='lg' padding='50px 30px' fontSize='50px'/>
          </Link>
        
        </HStack>

    </Flex>
  )
}

export default Root