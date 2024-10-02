import mongoose from 'mongoose'
const { Schema } = mongoose;


const productSchema = new Schema({
    product: {
        type: String,
        required: true
    }, 
    quantity: {
        number: {type: Number, required: true},
        unit: {type: String, required: true}
    },
    cost: {
        type: Number,
        required: true
    },
    dateIn: {
        type: Date,
        required: true
    },
    dateOut: {
        type: Date,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    stock: {
        type: Boolean,
        required: true
    }
});

  export const Product = mongoose.model('Product', productSchema);
