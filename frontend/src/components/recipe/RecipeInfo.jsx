import { Badge, Box, Button, Flex, Heading, HStack, Icon, Img, Text } from '@chakra-ui/react'
import React from 'react'
import { GiPlainCircle } from 'react-icons/gi'
import { IoClose, IoTrash } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'

function RecipeInfo({recipe, canmake, times, tags, ingredients, setShow, show, setShow2, show2}) {
    
    const handleOpenEdit = () => {
        setShow(!show)
        setShow2(!show2)
    }
    
  return (


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
                    src='https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0749D9BC-260D-40F4-A07F-54814C4A82B4/Derivates/A73A7793-F3EE-4B90-ABA4-1CC1A0C3E18F.jpg' 
                    alt='Sushi'
                    boxSize='200px'
                    objectFit='cover'
                    borderRadius={10}
                    >
                    </Img>
                </Flex>
                <Flex direction='column'>
                <Flex justifyContent='left' alignItems='center' gap={4}>
                    <Heading color='teal'>{recipe.name}</Heading> 
                    <GiPlainCircle fontSize='25px' color={canmake} />
                    <Icon as={MdEdit} onClick={handleOpenEdit} color='teal' fontSize='25px'/>
                    <IoTrash
                    fontSize='25px'
                    color='teal'
                    onClick={()=> handleDelete()}
                    />
                    
                    </Flex>
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
  )
}

export default RecipeInfo