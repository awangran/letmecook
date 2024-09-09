import express from 'express';
import { Product } from '../models/productModel.js'

const fridgeRouter = express.Router();

//route save product
fridgeRouter.post('/', async(req,res)=>{
    try {
        if (
            !req.body.product ||
            !req.body.quantity ||
            !req.body.dateIn ||
            !req.body.type
        ) {
            return res.status(400).send({
                message: 'Send all required fields'
            });
        }

        const quantity = {
            number: req.body.quantity.number,
            unit: req.body.quantity.unit
          };

        const newProduct = {
            product: req.body.product, 
            quantity: quantity,
            cost: req.body.cost,
            dateIn: req.body.dateIn,
            dateOut: req.body.dateOut,
            type: req.body.type,
            stock: req.body.stock,
        };

        const product = await Product.create(newProduct);

        return res.status(201).send(product);

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message})
    }
});

//route get all products
fridgeRouter.get('/', async (req,res) => {
    try {
        const products = await Product.find({})

        return res.status(200).json({
            count: products.length,
            data: products
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
});

//route to get one product from db by id
fridgeRouter.get('/:id', async (req,res) => {
    try {

        const { id } = req.params;

        const product = await Product.findById(id);


        return res.status(200).json(product);
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

//route to delete product

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

export default fridgeRouter;