import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, Divider, List, ListItem, UnorderedList, Flex } from '@chakra-ui/react'
import GeneratedRecipeInfo from './GeneratedRecipeInfo'
import { useState } from 'react'


function RecipeCard({recipe}) {
    const instock = recipe.usedIngredients
    const nostock = recipe.missedIngredients
    const [show, setShow] = useState(false);

  return (
    <>
    <Card maxW='sm'>
        <CardBody>
            <Image
            src={recipe.image}
            alt='recipe img'
            objectFit='cover'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Heading size='md'>{recipe.title}</Heading>
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
      <GeneratedRecipeInfo key={recipe.id} show={show} setShow={setShow} recipe={recipe}/>
    )}

 
    </>
  )
}

export default RecipeCard
