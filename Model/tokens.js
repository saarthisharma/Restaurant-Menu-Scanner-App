const mongoose = require("mongoose")

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    }
},{timestamps: true})

module.exports = new mongoose.model("token",TokenSchema)