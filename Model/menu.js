const mongoose = require("mongoose")
const menuSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category"
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    tags: {
        type: Number,
        required: true
    },
    price: {
        type: double,
        required: true
    }    
})
module.exports = new mongoose.model("menu" , menuSchema)    