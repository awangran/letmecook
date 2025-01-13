import { Badge, Box, Button, Flex, Heading, HStack, Icon, Img, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { GiPlainCircle } from 'react-icons/gi'
import { IoClose, IoTrash } from 'react-icons/io5'
import { MdEdit, MdOutlineAddShoppingCart } from 'react-icons/md'

function GeneratedRecipeInfo({recipe, setShow, show}) {
  return (

    <>    
    <Flex
        width='100%'
        height='100vh' 
        position='absolute' 
        top='0' 
        justifyContent='center'
        zIndex='10'
        left='0'
        >
        <Flex width='50%' height='fit-content' boxShadow='12px 12px 2px 1px teal' p={10} direction='column' position='absolute' top='25%' backgroundColor='teal.50' borderRadius='10px'>
        <Flex justifyContent='right' alignContent='center'>
            <IoClose
            fontSize='30px'
            color='teal'
            onClick={()=> setShow(!show)}
            />
        </Flex>
       
            <HStack gap={6}>
                <Flex>
                <Img 
                    src={recipe.image}
                    alt='image'
                    boxSize='fit-content'
                    objectFit='cover'
                    borderRadius={10}
                    >
                    </Img>
                </Flex>
                <Flex direction='column'>
                <Flex justifyContent='left' alignItems='center' gap={4}>
                    <Heading color='teal'>{recipe.title}</Heading> 
                    <GiPlainCircle fontSize='25px' />
                    <MdOutlineAddShoppingCart
                    cursor='pointer'
                    fontSize='25px'
                    color='teal'
                    />
                  
                    
                    </Flex>
                    {recipe.preparationMinutes !== null && (
                    <Text><b>Prep time:</b> {recipe.preparationMinutes} mins</Text>
                    )}
                    {recipe.cookingMinutes !== null && (
                    <Text><b>Cooking time:</b> {recipe.cookingMinutes} mins</Text>
                    )}
                    {recipe.readyInMinutes !== null && (
                    <Text><b>Ready time:</b> {recipe.readyInMinutes} mins</Text>
                    )}
                    {recipe.servings !== null && (
                    <Text><b>Servings:</b> {recipe.servings}</Text>
                    )}
                   
                    <Flex gap={2} direction='row' my={2}> 
                    {recipe.readyInMinutes !== null && (
                        <>
                        <Text><b>Type:</b></Text>
                        {recipe.dishTypes.map((t) => (
                            <Badge key={t} colorScheme='teal' alignContent='center' variant='outline'>{t}</Badge>
                            ))}
                        </>
                    )}
                    </Flex>

                    <Flex gap={2} direction='row' my={2}>
                    {recipe.cuisines !== null && recipe.cuisines.length > 0 && (
                        <>
                        <Text><b>Tags:</b></Text>
                        {recipe.cuisines.map((t) => (
                            <Badge key={t} colorScheme='teal' alignContent='center' variant='solid'>{t}</Badge>
                            ))}
                        </>
                    )}
                    {recipe.diets !== null && recipe.diets.length > 0 && (
                        <>
                        <Text><b>Diets:</b></Text>
                        {recipe.diets.map((t) => (
                            <Badge key={t} colorScheme='teal' alignContent='center' variant='solid'>{t}</Badge>
                            ))}
                        </>
                    )}
                       
                    </Flex>
                </Flex>

           

            </HStack>
            <HStack gap={6} mt={4}>
                <Flex direction='column' width='200px'>
                    <Text><b>Link:</b> <a href={recipe.sourceUrl} target='_blank'><u>recipe</u></a></Text>
                    <Flex direction='column' gap={2} wrap='wrap' maxWidth='200px'>
                        <Text><b>Ingredients</b></Text>
                        <Text>Used: {recipe.usedIngredientCount} Missing: {recipe.missedIngredientCount} </Text>
                        {recipe.usedIngredients.map((item) => (
                            <Badge colorScheme='teal' width='fit-content' key={item.id}>
                            {item.amount} {item.unit} {item.name} {item.aisle}
                            </Badge>
                        ))}
                        {recipe.missedIngredients.map((item) => (
                            <Badge colorScheme='teal' width='fit-content' whiteSpace="normal" 
                            overflowWrap="break-word"  maxWidth='200px' skey={item.id} >
                            {item.amount} {item.unit} {item.name} {item.aisle}
                            </Badge>
                        ))}
                    </Flex>
                </Flex>
            </HStack>

            <Flex my={4} justifyContent='center'>
                <Button mr={2} colorScheme='teal' variant='outline' onClick={()=> setShow(!show)}>Close</Button>
                <Button mr={2} colorScheme='teal' >Save</Button>

            </Flex>
            


        </Flex>
        </Flex>

    </>
  )
}

export default GeneratedRecipeInfo