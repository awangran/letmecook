import { Box, Button, Checkbox, Flex, Input, InputGroup, InputLeftElement, List, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { FiTrash } from 'react-icons/fi'
import { IoFilter, IoSearch } from 'react-icons/io5'


const Searchbar = ({products}) => {
  const cuisineList = [
    'African',
    'Asian',
    'American',
    'British',
    'Cajun',
    'Caribbean',
    'Chinese',
    'Eastern European',
    'European',
    'French',
    'German',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Japanese',
    'Jewish',
    'Korean',
   'Latin American',
    'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Nordic',
    'Southern',
    'Spanish',
    'Thai',
    'Vietnamese',
  ]
  const [cuisine, setCuisine] = useState([])
  const iproducts = products.map((obj) => obj.product)
  const [inputValue, setInputValue] = useState("");
  const [filteredInput, setFilteredInput] = useState(products);
  const [isOpen, setIsOpen] = useState(false);
  const [ingredientname, setIngredientname] = useState()
  const [excludeIngredients, setExcludeIngredients] = useState([])
  const [type, setType] = useState([])
  const [time, setTime] = useState(0)
  const [pantry, setPantry] = useState(false)
  const [showFilters, setShowFilters] = useState(false);


  //handle tag cuisine buttons clicked
  const handleCuisine = (tag) => {
    setCuisine((prev) =>
    prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
    console.log(cuisine)
  }

  //handle add ingredient field
  const addIngredientField = () => {
    setExcludeIngredients(
        [
            ...excludeIngredients,
            ingredientname
        ]
    )
  }

  const handleDelete = (name) => {
    setExcludeIngredients(
      excludeIngredients.filter(item => item !== name),
    )
  }

  //function for ingredient suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIngredientname(value)
    setFilteredInput(
      iproducts.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase()) 
      )
    );
    setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setIsOpen(false);
    setIngredientname(option)
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 100); // Delay to allow option selection
  };

  //handle type of recipe array
  const handleType = (e) =>{
    const { value, checked } = e.target;

    if (checked) {
    setType((prev) => [...prev, value]);
    } else {
    setType((prev) => prev.filter((item) => item !== value));
    }
   }
  
    //handle exclude pantry items
  const handlePantry = (e) =>{
    const { value, checked } = e.target;

    if (checked) {
    setPantry(true);
    } else {
    setPantry(false);
    }
  }
 

  return (
    <>
    <Flex
    direction='column'
    justifyContent='center'
    alignContent='center'
    width='100%'
    >

    <Flex width='40%' alignSelf='center' alignItems='center' gap={3} my={4}>
    <InputGroup borderRadius={10}>
    <InputLeftElement pointerEvents='none'>
      <IoSearch color='teal' />
    </InputLeftElement>
    <Input type='tel' placeholder='Search recipe' />
    </InputGroup>
    <IoFilter color='teal' cursor='pointer' fontSize='25px' onClick={() => setShowFilters(!showFilters)}/>
    </Flex>

    {/* cuisine, includeIngredients, excludeIngredients, type, fillIngredients, maxReadyTime, ignorePantry */}
    {showFilters && (
       <Flex
       mx={20}
       direction='row'
       gap={4}
       justifyContent='space-between'
       mt={10}
       >
         <Flex  direction='column' width='30%' >
           <Text color='teal' fontWeight='bold' mb={2} ml={2} width='fit-content'>Cuisine</Text>
               <Flex  wrap="wrap" justifyContent='left' gap={2}  spacing={2} border='solid' borderWidth='thin' p={4} borderRadius={5} borderColor='gray.100'>
                   {
                       cuisineList.map((tag) => (
                           <Button key={tag} width='fit-content' size='xs' colorScheme='teal' variant={cuisine.includes(tag) ? "solid" : "outline"}  id={tag} onClick={()=>{handleCuisine(tag)}}
                           >{tag}</Button>
                       ))
                   }
               </Flex>
           </Flex>
   
           <Flex direction='column'> 
           <Text color='teal' fontWeight='bold' mb={2} ml={2}>Exclude Ingredients</Text>
   
           <Flex direction='row' alignItems='center' gap={2} marginBottom={4}>
           <Box position="relative" >
           <Input
             value={inputValue}
             onChange={handleInputChange}
             onFocus={() => setIsOpen(true)}
             onBlur={handleBlur}
         />
         {isOpen && (
           <List
           position="absolute"
           width="fit-content"
           bg="white"
           border="1px solid"
           borderColor="gray.200"
           borderRadius="md"
           maxHeight="150px"
           overflowY="auto"
           zIndex="10"
           mt={2}
           >
           {filteredInput.map((item) => (
               <ListItem
               key={item}
               px={4}
               py={2}
               cursor="pointer"
               _hover={{ bg: "gray.100" }}
               onClick={() => handleOptionClick(item)}
               >
               {item}
               </ListItem>
           ))}
           </List>
           )}
           </Box>
   
           <Button size='sm' colorScheme='teal' onClick={() => {addIngredientField()}} >+</Button>
           </Flex>
   
           <UnorderedList>
             {excludeIngredients.map((item) => (
                 <>
                     <ListItem marginRight={2} key={item}>
                         <Flex gap={2} alignItems='center'>
                             {item} 
                             <FiTrash onClick={() => {handleDelete(item)}} /> 
                         </Flex>
                     </ListItem>
                     
                 </>
             ))}
             </UnorderedList>
           </Flex>
   
           <Flex direction='column'>
             <Text color='teal' fontWeight='bold' mb={2} ml={2}>Type</Text>
             <Stack spacing={2} px={4} direction={['column', 'column']} color='gray.600'>
                             <Checkbox size='sm' colorScheme='teal' value='main course' onChange={(e) => {handleType(e)}}>
                               Main Course
                             </Checkbox>
                             <Checkbox size='sm' colorScheme='teal'  value='side dish' onChange={(e) => {handleType(e)}}>
                               Side Dish
                             </Checkbox>
                             <Checkbox size='sm' colorScheme='teal'   value='breakfast' onChange={(e) => {handleType(e)}}>
                               Breakfast
                             </Checkbox>
                             <Checkbox size='sm' colorScheme='teal'   value='soup' onChange={(e) => {handleType(e)}}>
                               Soup
                             </Checkbox>
                             <Checkbox size='sm' colorScheme='teal'  value='snack' onChange={(e) => {handleType(e)}}>
                                 Snack
                             </Checkbox>
                             <Checkbox size='sm' colorScheme='teal'  value='dessert' onChange={(e) => {handleType(e)}}>
                                 Dessert
                             </Checkbox>
                             <Checkbox size='sm' colorScheme='teal'  value='drink' onChange={(e) => {handleType(e)}}>
                                 Drink
                             </Checkbox>
                         </Stack>
             </Flex>
   
             <Flex direction='column' gap={4}>
             <Text color='teal' fontWeight='bold' mb={2} ml={2}>Cooking time (mins)</Text>
             <Input type='number' onChange={(e) => {setTime(e)}} />
   
             <Text color='teal' fontWeight='bold' mb={2} ml={2}>Ignore pantry items</Text>
             <Checkbox size='lg' colorScheme='teal' onChange={(e) => {handlePantry(e)}}>
                 Ignore
             </Checkbox>
             </Flex>
   
       </Flex>
    )}
   

    


    </Flex>
    </>
  )
}

export default Searchbar