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
    resetPasswordToken: {
        type:String,
        required:true
    },
    // userType : 1-admin , 2-Restaurant Owner , 3-Restaurant manager , 4-end user
    userType: {
        type: Number,
        default: 2 
    }
    
},{timestamps: true})
module.exports = new mongoose.model("user" , userSchema)
