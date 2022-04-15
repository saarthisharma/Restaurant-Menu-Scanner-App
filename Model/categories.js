const mongoose = require("mongoose")
const categoriesSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "restaurant"
    },
    name: {
        type: String,
        required: true
    },

    // 1 - Available , 2 - notAvailable
    availableStatus: {
        type: Number, 
        required: true
    }
},{timestamps: true})
module.exports = new mongoose.model("category" , categoriesSchema)