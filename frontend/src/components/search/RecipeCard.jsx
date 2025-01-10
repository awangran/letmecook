import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button, Divider, List, ListItem, UnorderedList } from '@chakra-ui/react'

function RecipeCard({recipe}) {
    const instock = recipe.usedIngredients
    const nostock = recipe.missedIngredients
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
                Have: {recipe.usedIngredientCount}   
            </Text>
            <UnorderedList>
            {instock.map((a) => (
                    <ListItem key={a.id}>{a.name} {a.amount} {a.unit}</ListItem>
                ))}
            </UnorderedList>
            
            <Text>
                Missing: {recipe.missedIngredientCount}
            </Text>
            <UnorderedList>
            {nostock.map((a) => (
                    <ListItem key={a.id}>{a.name} {a.amount} {a.unit}</ListItem>
                ))}
            </UnorderedList>
            </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
            <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='teal'>
                More info
            </Button>
            <Button variant='ghost' colorScheme='teal'>
                Add to cart
            </Button>
            </ButtonGroup>
        </CardFooter>
    </Card>

    <Flex
    width='100%'
    height='100%'
    >
        

    </Flex>
    </>
  )
}

export default RecipeCard
