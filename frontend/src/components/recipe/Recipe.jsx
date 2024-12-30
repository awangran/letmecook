import { Badge, Box, Button, Flex, Heading, HStack, Img, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { GiPlainCircle } from 'react-icons/gi'
import { IoClose } from "react-icons/io5";
<IoClose />

function Recipe({recipe}) {
    //Open recipe info
    const [show, setShow] = useState(false)
    const tags = recipe.tags
    const ingredients = recipe.ingredients
    const times = recipe.time
    console.log(recipe)

    //function for calculating if able to make
  


  return (
    <>
    

    <Flex margin={2} p={4} border='solid' borderRadius='10px' borderColor='teal' width='fit-content' height='fit-content' >
        <HStack>
            <Flex>
                <Img 
                src='https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0749D9BC-260D-40F4-A07F-54814C4A82B4/Derivates/A73A7793-F3EE-4B90-ABA4-1CC1A0C3E18F.jpg' 
                alt='Sushi'
                boxSize='130px'
                objectFit='cover'
                borderRadius={10}
                >

                </Img>
            </Flex>
            <Flex direction='column'>
                <Flex alignItems='center' gap={2}>
                    <Text fontWeight='600' fontSize='xl' color='teal'>{recipe.name}</Text>
                    <GiPlainCircle color='green' />
                </Flex>
                <Text>Time: {times[2]} min</Text>
                <Flex gap={2} direction='row' my={2}>
                    {tags.map((tag) => (
                         <Badge colorScheme='teal'>{tag}</Badge>
                    ))}
                   
                    
                </Flex>
                <Box>
                    <Button mr={2} colorScheme='teal' onClick={()=> setShow(!show)}>Read</Button>
                    <Button colorScheme='teal' variant='outline'>Make</Button>
                </Box>

            </Flex>
        </HStack>
    </Flex>

    {show && (
        <> 
        <Flex 
        width='100%' 
        height='100vh' 
        position='absolute' 
        top='0' 
        justifyContent='center'
        zIndex='10'
        >
        <Flex width='50%' height='fit-content' boxShadow='12px 12px 2px 1px teal' p={10} direction='column' position='absolute' top='25%' backgroundColor='teal.50' borderRadius='10px'>
        <Flex justifyContent='right'>
            <IoClose
            fontSize='30px'
            color='teal'
            onClick={()=> setShow(!show)}
            />
        </Flex>
            <HStack gap={6}>
                <Flex>
                <Img 
                    src='https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0749D9BC-260D-40F4-A07F-54814C4A82B4/Derivates/A73A7793-F3EE-4B90-ABA4-1CC1A0C3E18F.jpg' 
                    alt='Sushi'
                    boxSize='200px'
                    objectFit='cover'
                    borderRadius={10}
                    >
                    </Img>
                </Flex>
                <Flex direction='column'>
                    <Heading color='teal'>{recipe.name}</Heading>
                    <Text><b>Prep time:</b> {times[0]} min</Text>
                    <Text><b>Cooking time:</b> {times[1]} min</Text>
                    <Text><b>Total time:</b> {times[2]} min</Text>
                    <Text><b>Servings:</b> {recipe.servings}</Text>
                    <Flex gap={2} direction='row' my={2}> 
                    <Text><b>Type:</b></Text>
                     {recipe.type.map((t)=>(
                        <Badge colorScheme='teal' alignContent='center' variant='outline'>{t}</Badge>
                    ))}
                    </Flex>

                    <Flex gap={2} direction='row' my={2}>
                        <Text><b>Tags</b></Text>
                        {tags.map((tag) => (
                         <Badge colorScheme='teal' alignContent='center'>{tag}</Badge>
                    ))}
                    </Flex>
                </Flex>

           

            </HStack>
            <HStack gap={6} mt={4}>
                <Flex direction='column' width='200px'>
                    <Text><b>Link:</b> <a href={recipe.link}><u>recipe</u></a></Text>
                    <Flex direction='column' gap={2} >
                        <Text><b>Ingredients</b></Text>
                        {ingredients.map((item) => (
                            <Badge colorScheme='teal' width='fit-content' key={item.name}>
                            {item.number} {item.unit} {item.name} 
                            </Badge>
                        ))}

                    </Flex>
                </Flex>
                <Flex direction='column'>
                    <Text><b>Notes</b></Text>
                    <Box backgroundColor='white' borderRadius='10px' p={4} >
                        <Text>
                            {recipe.notes}

                        </Text>
                    </Box>
                </Flex>
            </HStack>

            <Flex my={4} justifyContent='center'>
                <Button mr={2} colorScheme='teal' onClick={()=> setShow(!show)}>Close</Button>
                <Button colorScheme='teal' variant='outline'>Make</Button>
            </Flex>
            


        </Flex>
        </Flex>
        </>
    )}


    </>
  )
}

export default Recipe