const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    otpVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required:false
    },
    email: {
        type: String,
        required:false,
        unique: true
    },
    countryCode: {
        type: String,
        required: false
    },

    // userType : 4-end user
    userType: {
        type: Number,
        default: 4 
    }
    
},{timestamps: true})
module.exports = new mongoose.model("appUser" , userSchema)
