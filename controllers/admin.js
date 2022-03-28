const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})
const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")
const User = require("../Model/user")
const {userValidation} = require("../validations/userRegisterJoi");

// signup
const adminSignup = async(req,res)=>{
    try {
        const{email , password , confirmPassword} = req.body
        console.log('req.body :', req.body);
        
        // joi
        let validation = userValidation(req.body);
        console.log('validation :', validation);
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        // password match
        // if(password != confirmPassword){
        //     return responseHandler.handler(res,false,message.customMessages.passwordNotMatch,[],500)
        // }

        // checking email existence
        let user = await User.findOne({email:email})
        if(user){
            return responseHandler.handler(res,false,message.customMessages.userAlreadyExists,[],500)
        }

        //hashing the password
        const hashedPassword = await bcrypt.hash(password , Number(process.env.saltRounds))

        // saving in db
        let newUser = new User({
            email:email,
            password:hashedPassword
        })
        let userCreated=await newUser.save()
        return responseHandler.handler(res,true,message.customMessages.userCreated,userCreated,201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}
module.exports = {
    adminSignup
}