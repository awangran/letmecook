import { Badge, Box, Button, Flex, Heading, HStack, Icon, Img, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { GiPlainCircle } from 'react-icons/gi'
import { IoClose, IoTrash } from 'react-icons/io5'
import { MdEdit, MdOutlineAddShoppingCart } from 'react-icons/md'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'

function RecipeInfo({recipe, canmake, times, tags, ingredients, setShow, show, setShow2, show2, products, showAlert, handleDelete}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const handleOpenEdit = () => {
        setShow(!show)
        setShow2(!show2)
    }
    
    //add recipe to cart function
    const addRecipeCart = () => {
        for (const ingredient of ingredients){
            const matchingProduct = products.find(
                product => product.product === ingredient.name
            );
            if (matchingProduct){
                const {_id:id, product:name, cost, cost:total} = matchingProduct
                const quantity = Number(ingredient.number)
                const unit = matchingProduct.quantity.unit
                addToCart(id,name,quantity,unit,cost,total)
               
            } else {
                showAlert("error", `${ingredient.name} not found on fridge.`)
            }
            showAlert("success", `Recipe product ${ingredient.name} added to cart`)
               
        }

    }

    const addToCart = (id, name, quantity, unit, cost, total) => {
        const cartProduct = {
            id: id,
            name: name,
            quantity: quantity,
            unit: unit,
            cost: cost,
            total: total,
        };
    
        let cartArray = JSON.parse(localStorage.getItem('cartArray'));
    
        if (cartArray !== null) {
            const existingProductIndex = cartArray.findIndex(element => element.id === cartProduct.id);
            if (existingProductIndex !== -1) {
                cartArray[existingProductIndex].quantity += cartProduct.quantity;
                cartArray[existingProductIndex].total = cartArray[existingProductIndex].cost * cartArray[existingProductIndex].quantity
            } else {
                cartArray.push(cartProduct);
            }
    
            localStorage.setItem("cartArray", JSON.stringify(cartArray));
        } else {
            localStorage.setItem("cartArray", JSON.stringify([cartProduct]));
        }
        
    };
    
    
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
                    <Icon as={MdEdit} onClick={handleOpenEdit} color='teal' fontSize='25px' cursor='pointer'/>
                    <MdOutlineAddShoppingCart
                    cursor='pointer'
                    fontSize='25px'
                    color='teal'
                    onClick={addRecipeCart}
                    />
                    <IoTrash
                    cursor='pointer'
                    fontSize='25px'
                    color='teal'
                    onClick={onOpen}
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
            </Flex>
            


        </Flex>
        </Flex>

        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete recipe
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='teal' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default RecipeInfo