import express from "express";
import { mongoDBURL, PORT } from "./config.js"
import mongoose from 'mongoose'
import { Product } from "./models/productModel.js";
import fridgeRoutes from './routes/fridgeRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js'
import cors from 'cors';

const app = express();

//middleware parsing request body
app.use(express.json());

//middleware handling cors
app.use(cors());


app.get('/', (req,res) => {
    console.log(req)
    return res.status(234).send('Here')
})

//use routes
app.use('/fridge', fridgeRoutes)
app.use('/recipes', recipeRoutes)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('app conected to db');
        app.listen(PORT, () => {
            console.log(`App is running in port: ${PORT}`);
        });
    }) 
    .catch((err) => {
        console.log(err)
    })