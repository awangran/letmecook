import mongoose from 'mongoose'
const { Schema } = mongoose;


const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        required: true
    },
    time: {
        type: Array,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    image: {
        type: String,
    },
    notes: {
        type: String,
        required: true
    }
    
});

  export const Recipe = mongoose.model('Recipe', recipeSchema);
