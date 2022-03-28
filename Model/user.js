const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    userType: {
        type: Number,
        default: 2 
    }
})
module.exports = new mongoose.model("user" , userSchema)
