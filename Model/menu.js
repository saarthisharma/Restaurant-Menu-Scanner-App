const mongoose = require("mongoose")
const menuSchema = new mongoose.Schema({
    // categories : 1 - starter , 2 - beverages , 3 - main course , 4 - soups
    restaurantId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "restaurant"
    },
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
        type: Array,
        required: true
    },
    price: {
        type: double,
        required: true
    }    
})
module.exports = new mongoose.model("menu" , menuSchema)    