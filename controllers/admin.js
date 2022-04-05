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
const { tokenValidation } = require("../validations/tokenValidation");
const {emailValidation} = require("../validations/emailValidation")
const {resetPasswordValidation} = require("../validations/resetPasswordValidation")
const crypto = require("crypto");
const {encryptToken} = require("../helper/cryptoModule")
const logger = require("../utils/logger");
const res = require("express/lib/response");
const {resetPasswordMail} = require("../utils/mails")

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

        // password reset token
        const newPayload = {email:email}

        const PasswordToken=jwt.sign(newPayload,process.env.JWT_SECRET)
        let newUser = new User({
            email:email,
            password:hashedPassword,
            resetPasswordToken:PasswordToken
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
        // logger.info("New user successfully created")
        return responseHandler.handler(res,true,message.customMessages.userCreated,PasswordToken,201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const adminLogin=async(req,res)=>{
    try {
        const{email,password} = req.body
        console.log('req.body :', req.body);

        // joi
        let validation = userValidation(req.body);
        
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        // checking email existence
        let user = await User.findOne({email:email})
        console.log('user :', user);

        if(!user){
            return responseHandler.handler(res,false, message.customMessages.Loginerror, [], 500)
        }

        const passwordMatch = await bcrypt.compare(password , user.password);

        if(!passwordMatch){
            return responseHandler.handler(res,false, message.customMessages.Loginerror, [], 500)
        }

        const payload = {
            _id: user._id
            }

        const token = jwt.sign(payload , process.env.JWT_SECRET)   

        let hashedToken = encryptToken(token);
            
        let tokenCollection = new Token({
            token : hashedToken,
            userId: user._id
        })

        await tokenCollection.save()

        return responseHandler.handler(res,true, message.customMessages.successLoggedIn,token, 201)
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.Loginerror, [], 500)
    }
}

const adminLogout = async(req,res)=>{
    try {
        const {token} = req.headers
    
        const secret = process.env.CRYPTO_SECRET;

        const hash = crypto.createHash('sha256', secret).update(token).digest('hex');

        const deleteToken = await Token.find({token:hash}).deleteOne().exec()
    
        if(deleteToken.deletedCount == 0){
            return responseHandler.handler(res,false, message.customMessages.TokenDatabaseEmpty, [], 500)
        }
        return responseHandler.handler(res,true, message.customMessages.logoutMessage,[], 201)  
    } catch (error) {
        console.log('error :', error);       
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const adminForgotPassword = async(req,res)=>{
    try {
        const{email} = req.body
        let validation = emailValidation(req.body);
        
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }
        let user = await User.findOne({email:email})
    
        if(!user){
            return res.status(400).json({error:"user with this email does not exist"})
        }

        // sending mail with reset link
        await resetPasswordMail(email , user.resetPasswordToken)    
        return responseHandler.handler(res,true, message.customMessages.passwordResetLinkMessage,[], 201)
    } catch (error) {
        console.log('error :', error);       
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}
const adminResetPassword = async(req,res)=>{
    try {
        const token = req.query.token
        console.log('token :', token);
        
        let user = await User.findOne({resetPasswordToken:token})
        console.log('user :', user);
        
        if(!user){
            return responseHandler.handler(res,false, message.customMessages.invalidToken, [], 500)    
        }

        const {newPassword , confirmNewPassword} = req.body

        let validation = resetPasswordValidation(req.body)

        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }

        const hashedPassword = await bcrypt.hash(newPassword , Number(process.env.saltRounds))

        // updating new password
        let updatePassword = await User.updateOne(
            {_id:user._id , email:user.email},
            {
                $set:{password:hashedPassword}
            }
        )

        return responseHandler.handler(res,true, message.customMessages.passwordChangeSuccess,[], 201)

    } catch (error) {
        console.log('error :', error);       
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
} 
module.exports = {
    adminSignup,
    adminLogin,
    adminLogout,
    adminForgotPassword,
    adminResetPassword
}