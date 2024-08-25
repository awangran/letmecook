import express from "express";
import { mongoDBURL, PORT } from "./config.js"
import mongoose from 'mongoose'

const app = express();



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