const mongoose = require("mongoose")
const user = require("./user")
const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    countryName: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    cuisines: {
        type: Array,
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
    acceptedCurrency: {
        type: Array,
        required: true
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'user'
    },
    activeStatus: {
        type: Number,
        default: 0,
        required: true
    },
},{timestamps: true})
module.exports = new mongoose.model("restaurant" , restaurantSchema)