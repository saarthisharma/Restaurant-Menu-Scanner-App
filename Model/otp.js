const mongoose = require("mongoose")
const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "appUser"
    },
    phoneOTP: {
        type: String,
        required: false
    },
    otpExpireTime: {
        type: Number
    },
    isExpire: {
        type: Boolean,
        default: false
    }            
},{timestamps: true})
module.exports = new mongoose.model("otp" , otpSchema)
