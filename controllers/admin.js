const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")
dotenv.config({path : "../.env"})
const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")
const User = require("../Model/user")
const Token = require("../Model/tokens")
const {userValidation} = require("../validations/userRegisterJoi");
const crypto = require("crypto");
const {encryptToken} = require("../helper/cryptoModule")

// signup
const adminSignup = async(req,res)=>{
    try {
        const{email , password , confirmPassword} = req.body
        
        // joi
        let validation = userValidation(req.body);
        
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

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
       
        let userCreated = await newUser.save()

        // setting admin type
        await User.updateOne(
                {email:email},
                {
                    $set:{userType:1}            
                }
            )
        
        const payload = {
            _id:userCreated._id
        }    

        const token = jwt.sign(payload , process.env.JWT_SECRET)
    
        let hashedToken = encryptToken(token);
        
        // saving tokens
        let tokenCollection = new Token({
            token : hashedToken,
            userId: newUser
        })

        await tokenCollection.save()     
        
        return responseHandler.handler(res,true,message.customMessages.userCreated,token,201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}
module.exports = {
    adminSignup
}