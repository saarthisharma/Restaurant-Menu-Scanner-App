const mongoose = require("mongoose")
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cuisines: {
        type: Number,
        required: true
    },
    openingTime: {
        type: Number,
        required: true
    },
    closingTime: {
        type: Number,
        required: true
    },
    activeStatus: {
        type: Number,
        required: true
    }
})
module.exports = new mongoose.model("restaurant" , restaurantSchema)