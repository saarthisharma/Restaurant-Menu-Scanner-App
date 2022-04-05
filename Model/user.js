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
    // userType : 1 for admin user , 2 for other users
    userType: {
        type: Number,
        default: 2 
    }
    
},{timestamps: true})
module.exports = new mongoose.model("user" , userSchema)
