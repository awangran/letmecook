import { Box, Button, Checkbox, Flex, Textarea, FormLabel, Heading, Img, Input, List, ListItem, Select, Spacer, Stack, Text, UnorderedList } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { FiTrash } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'

function EditRecipe({recipe, setShow2, show2, fetchRecipes, showAlert}) {
    const [products, setProducts] = useState([]);
    
    const tags = [
        "western", "asian", "sweet", "salty", "spicy", "sour", "umami", "colombian", "italian", "mexican", "chinese", "japanese", "indian", "thai", "vietnamese", "korean", "mediterranean", "middle eastern", "american", "vegan", "vegetarian", "dairy-free", "organic", "high-protein", "grilled", "fried", "baked", "roasted", "steamed", "raw", "seafood", "meat", "poultry", "dessert", "snack", "appetizer", "fast food", "comfort food", "gourmet", "fusion", "traditional"
    ]
    const units = [
        "unit", "teaspoon", "tablespoon", "cup", "ounce", "pound", "gram", "kilogram", "milliliter", "liter", "pinch", "dash", "quart", "gallon", "sheet", "bottle", "slice"
    ]
    const [inputValue, setInputValue] = useState("");
    const [filteredInput, setFilteredInput] = useState(products);
    const [isOpen2, setIsOpen2] = useState(false);
    const [selectedTags, setSelectedtags] = useState(recipe.tags)

    //variables for input fields
    const [name, setName] = useState(recipe.name)

    const [type, setType] = useState(recipe.type)
    const [link, setLink] = useState(recipe.link)
    const [servings, setServings] = useState(recipe.servings)
    const [ptime, setPtime] = useState(recipe.time[0])
    const [ctime, setCtime] = useState(recipe.time[1])
    const [ttime, setTtime] = useState(recipe.time[2])
    const [ingredients, setIngredients] = useState(recipe.ingredients)
    const [iname, setIname] = useState('')
    const [inumber, setInumber] = useState(0)
    const [iunit, setIunit] = useState('unit')
    
    const [image, setImage] = useState(recipe.image)
    const [notes, setNotes] = useState(recipe.notes)

    const time = [ptime, ctime, ttime]
    const id = recipe._id

    //fetching products
    const fetchProducts = () => {
        axios
          .get('http://localhost:5555/fridge')
          .then((res) => {
            const products = res.data.data
            //filter into only product name array
            setProducts(products.map((obj) => obj.product));

            })
            .catch((err) => {
                console.log(err);
            });

      };
     
    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []);

   
    //handle add ingredient field
    const addIngredientField = () => {
        setIngredients(
            [
                ...ingredients,
                {name: iname, number:inumber, unit:iunit}
            ]

        )
    }

    const handleDelete = (name) => {
        setIngredients(
            ingredients.filter(item => item.name !== name),
        )
    
    }

    //handle type of recipe array
    const handleType = (e) =>{
        const { value, checked } = e.target;

        if (checked) {
        setType((prev) => [...prev, value]);
        } else {
        setType((prev) => prev.filter((item) => item !== value));
        }
    }


    //handle tag buttons clicked
    const handleTags = (tag) => {
        setSelectedtags((prev) =>
        prev.includes(tag)
            ? prev.filter((t) => t !== tag)
            : [...prev, tag]
        );
        
    }

    //function for ingredient suggestions
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setIname(value)
        setFilteredInput(
          products.filter((product) =>
            product.toLowerCase().includes(value.toLowerCase())
          )
        );
        setIsOpen2(true);
      };
    
      const handleOptionClick = (option) => {
        setInputValue(option);
        setIsOpen2(false);
        setIname(option)
      };
    
      const handleBlur = () => {
        setTimeout(() => setIsOpen2(false), 100); // Delay to allow option selection
      };

      const handleEdit = () => {
        
        const tags = selectedTags

        const data = {
          name,
          type,
          time,
          ingredients,
          servings,
          link,
          tags,
          image,
          notes
        };
         axios
          .put(`http://localhost:5555/recipes/${id}`, data)
          .then(() => {
           showAlert("success", "Recipe editted successfully")
            setShow2(!show2)
            fetchRecipes();
          })
          .catch((err) => {
            showAlert("error", "There was an error editing this recipe. Check your inputs.")
            console.log(err)
            console.log(data)
          }); 

        
      };

  return (
    <>
    
    <Flex width='100%' 
    height='100vh' 
    position='absolute' 
    top='0' 
    backgroundColor='white' 
    direction='column'
    px={20}
    py={5}
    zIndex='10'
    left='0'
    >
        <Flex justifyContent='flex-end' ><IoClose color='teal' fontSize={30} onClick={()=> setShow2(!show2)}/></Flex>
        
        <Heading textAlign='center' margin={6} color='teal' >Edit Recipe</Heading>
        <Flex className='col-container' direction='row' gap={6} >
            <Box width='25%'>
            <Img 
                src='https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/0749D9BC-260D-40F4-A07F-54814C4A82B4/Derivates/A73A7793-F3EE-4B90-ABA4-1CC1A0C3E18F.jpg' 
                alt='Sushi'
                boxSize='200px'
                objectFit='cover'
                borderRadius={10}
                >
            </Img>
           
                <FormLabel htmlFor='name' my={3} color='teal' fontWeight='bold'>Name</FormLabel>
                <Input id="name" size='md' defaultValue={recipe.name} type='text' onChange={(e) => {setName(e.target.value)}}  backgroundColor='white' variant='filled' border='solid' borderWidth='thin' borderColor='gray' />

                <FormLabel htmlFor='name' my={3} color='teal' fontWeight='bold'>Link</FormLabel>
                <Input id="link" size='md' defaultValue={recipe.link}type='text' onChange={(e) => {setLink(e.target.value)}}  backgroundColor='white' variant='filled' border='solid' borderWidth='thin' borderColor='gray' />

                <FormLabel htmlFor='name' my={3} color='teal' fontWeight='bold'>Servings</FormLabel>
                <Input id="servings" size='md' defaultValue={recipe.servings}  type='number' onChange={(e) => {setServings(e.target.value)}}  backgroundColor='white' variant='filled' border='solid' borderWidth='thin' borderColor='gray' />

                

            </Box>
            <Spacer/>

            <Box width='25%'>
                <Stack spacing={2} border='solid' borderWidth='thin' p={4} borderRadius={5} borderColor='gray.100'>
                    <Text color='teal' fontWeight='bold'>Time</Text>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <FormLabel htmlFor='preptime' my={3} color='gray.600' >Prep time</FormLabel>
                        <Input id="preptime" size='sm' borderRadius={6}  defaultValue={recipe.time[0]} onChange={(e) => {setPtime(e.target.value)}} width={20} type='number' backgroundColor='white' variant='filled' border='solid' borderWidth='thin' borderColor='gray' />
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <FormLabel htmlFor='cookingtime' my={3} color='gray.600'>Cooking time</FormLabel>
                        <Input id="cookingtime" size='sm' borderRadius={6}  defaultValue={recipe.time[1]} onChange={(e) => {setCtime(e.target.value)}} width={20} type='number' backgroundColor='white' variant='filled' border='solid' borderWidth='thin' borderColor='gray' />
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <FormLabel htmlFor='totaltime' my={3} color='gray.600' >Total time</FormLabel>
                        <Input id="totaltime" size='sm' borderRadius={6}  defaultValue={recipe.time[2]} onChange={(e) => {setTtime(e.target.value)}} width={20} type='number' backgroundColor='white' variant='filled' border='solid' borderWidth='thin' borderColor='gray' />
                    </Flex>
                </Stack>
                
                {/* TODO need to handle the default checkboxes  */}
                <FormLabel htmlFor='type' my={3} px={4} color='teal' fontWeight='bold'>Type</FormLabel>
                <Stack spacing={[1, 5]} px={4} direction={['column', 'column']} color='gray.600'>
                    <Checkbox size='lg' colorScheme='teal' value='breakfast' onChange={(e) => {handleType(e)}}>
                        Breakfast
                    </Checkbox>
                    <Checkbox size='lg' colorScheme='teal'  value='lunch' onChange={(e) => {handleType(e)}}>
                        Lunch
                    </Checkbox>
                    <Checkbox size='lg' colorScheme='teal'   value='dinner' onChange={(e) => {handleType(e)}}>
                        Dinner
                    </Checkbox>
                    <Checkbox size='lg' colorScheme='teal'  value='snack' onChange={(e) => {handleType(e)}}>
                        Snack
                    </Checkbox>
                    <Checkbox size='lg' colorScheme='teal'  value='dessert' onChange={(e) => {handleType(e)}}>
                        Dessert
                    </Checkbox>
                </Stack>
            </Box>
            <Spacer/>
            

            <Box width='25%'>
                <Text color='teal' fontWeight='bold' mb={4}>Ingredients</Text>
                    
                <Flex direction='row' alignItems='center' gap={2} marginBottom={4}>
                 <Box position="relative" >
                 <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen2(true)}
                    onBlur={handleBlur}
                />
                    
                    {isOpen2 && (
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
                    <Input id="" size='sm' width={10} type='number' borderRadius={5} backgroundColor='white' variant='filled' border='solid' borderWidth='thin' borderColor='gray.100'
                    onChange={(e) => {setInumber(e.target.value)}}
                    />
                    <Select size='sm' width={20} placeholder='' color='gray.600' onChange={(e) => {setIunit(e.target.value)}}>
                        {
                            units.map((unit) => (
                                <option value={unit}>{unit}</option>
                            ))
                        }
                    </Select>
                    <Button size='sm' colorScheme='teal' onClick={() => {addIngredientField()}} >+</Button>
                </Flex>

                <UnorderedList>
                {ingredients.map((item) => (
                    <>
                        <ListItem marginRight={2} key={item.name}>
                            <Flex gap={2} alignItems='center'>
                                {item.name} {item.number} {item.unit} 
                                <FiTrash onClick={() => {handleDelete(item.name)}} /> 
                            </Flex>
                        </ListItem>
                        
                    </>
                ))}
                </UnorderedList>

                <Box>
                <FormLabel htmlFor='notes' my={3} px={4} color='teal' fontWeight='bold'>Notes</FormLabel>
                <Textarea resize='vertical' size='md' onChange={(e) => {setNotes(e.target.value)}}  defaultValue={recipe.notes}/>
                </Box>

            </Box>

            <Spacer/>
            <Box width='25%'>
                <Text color='teal' fontWeight='bold' mb={4}>Tags</Text>
                <Flex  wrap="wrap" justifyContent='center' gap={2}  spacing={2} border='solid' borderWidth='thin' p={4} borderRadius={5} borderColor='gray.100'>
                    {
                        tags.map((tag) => (
                            <Button width='fit-content' size='xs' colorScheme='teal' variant={selectedTags.includes(tag) ? "solid" : "outline"}  id={tag} onClick={()=>{handleTags(tag)}}
                            >{tag}</Button>
                        ))
                    }
                </Flex>
                

            </Box>
        </Flex>
        <Button colorScheme='teal' width='fit-content' px={6} py={4} alignSelf='center' onClick={handleEdit}>Submit</Button>
    </Flex>
    
   
    </>
  )
}

export default EditRecipe