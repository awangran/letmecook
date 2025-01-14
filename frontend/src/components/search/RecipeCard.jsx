import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, Divider, List, ListItem, UnorderedList, Flex } from '@chakra-ui/react'
import GeneratedRecipeInfo from './GeneratedRecipeInfo'
import { useState } from 'react'
import { useEffect } from 'react'
import { GiPlainCircle } from 'react-icons/gi'


function RecipeCard({recipe, products, showAlert}) {
    const instock = recipe.usedIngredients
    const nostock = recipe.missedIngredients
    const [show, setShow] = useState(false);
    const [make, setMake] = useState('black');

    //calculate circle color
    const checkCanMake = () => {
        if (recipe.missedIngredientCount == 0){
            setMake('#9AE6B4')
        } else if (recipe.missedIngredientCount < recipe.usedIngredientCount) {
            setMake('#F6AD55')
        } else{
            setMake('#9B2C2C')
        }
    }

    useEffect(() => {
      checkCanMake()
    }, [])
    

  return (
    <>
    <Card maxW='sm'>
        <CardBody>
            <Flex justifyContent='right' m={2}><GiPlainCircle color={make} fontSize='20px' /></Flex>

            <Image
            src={recipe.image}
            alt='recipe img'
            objectFit='cover'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Flex textAlign='center' alignItems='center' gap={2}>
            <Heading size='md' overflowWrap='break-word'>{recipe.title}</Heading>
            </Flex>    
            
            <Text>
                <b>Have:</b> {recipe.usedIngredientCount}   
            </Text>
           
            
            <Text>
                <b>Missing:</b> {recipe.missedIngredientCount}
            </Text>

            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='teal' onClick={() => setShow(!show)}>
                More info
            </Button>
            <Button variant='ghost' colorScheme='teal'>
                Add to cart
            </Button>
            </ButtonGroup>
        </CardFooter>
    </Card>

    {show && (
      <GeneratedRecipeInfo key={recipe.id} show={show} setShow={setShow} recipe={recipe} make={make} products={products} showAlert={showAlert} />
    )}

 
    </>
  )
}

export default RecipeCard
