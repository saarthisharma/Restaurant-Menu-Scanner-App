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
    availableStatus: {
        type: Number,
        required: true
    }
})
module.exports = new mongoose.model("category" , categoriesSchema)