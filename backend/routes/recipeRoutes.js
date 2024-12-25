import express from 'express';
import { Recipe } from '../models/recipeModel.js'

const recipeRouter = express.Router();

//route to save a recipe
//route save product
recipeRouter.post('/', async(req,res)=>{
    try {
        if (
            !req.body.name ||
            !req.body.type ||
            !req.body.ingredients        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }

        const newRecipe = {
            name: req.body.name,
            type: req.body.type,
            ingredients: req.body.ingredients,
            servings: req.body.servings,
            link: req.body.link,
            tags: req.body.tags,
            image: req.body.image,
            notes: req.body.notes,
        };

        const recipe = await Recipe.create(newRecipe);

        return res.status(201).send(recipe);

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message})
    }
});

//route get all recipes
recipeRouter.get('/', async (req,res) =>{
    try {
        const recipes = await Recipe.find({})

        return res.status(200).json({
            count: recipes.length,
            data: recipes
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
});


//route for update product
fridgeRouter.put('/:id', async (req,res) => {
    try {
        if (
            !req.body.product ||
            !req.body.quantity ||
            !req.body.dateIn ||
            !req.body.type
        ) {
            return response.status(400).send({
                message: 'complete all fields'
            });
        }

        const { id } = req.params;
        const result = await Product.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'product not found'})
        }
        return res.status(200).send({message: "done"})

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message : err.message})
    }
})


//TODO fix the next two routes
//route to delete recipes

fridgeRouter.delete('/:id', async (req,res) => {
    try {
        const { id } = req.params;

        const result = await Product.findByIdAndDelete(id);

        if(!result) {
            return res.status(404).json({})
        }
        return res.status(200).send({message : 'deleted'})
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});


export default recipeRouter;