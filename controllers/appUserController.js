const mongoose = require("mongoose")
const responseHandler = require("../helper/responseHandler")
const message = require("../helper/messages")
const res = require("express/lib/response")
const User = require("../Model/appUser")
const OTP = require("../Model/otp")
const constant = require("../utils/constants")
const jwt = require("jsonwebtoken");
const Token = require("../Model/tokens")
const crypto = require("crypto");
const {encryptToken} = require("../helper/cryptoModule")
const {phoneNumberValidation} = require("../validations/phoneNumber")
const {appUserValidation} = require("../validations/appUserValidation")

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const registerViaNumber = async(req,res) =>{
    try {
        const {phoneNumber} = req.body
        let user = await User.findOne({phoneNumber:phoneNumber})
        console.log('user :', user);

        // if phone number exist then login mechanism
        if(user){

            // let validation = phoneNumberValidation(req.body);
        
            // if(validation && validation.error == true){
            // return responseHandler.handler(res, false, validation.message , [], 422)
            // }
            let otp = generateOTP()

            var date = new Date();
            
            let time = date.getTime()

            let timeTillSeconds = Math.floor(time/1000)
            
            let saveOtp = new OTP({
                userId: user._id,
                phoneOTP: otp,
                otpExpireTime: timeTillSeconds
                })
                await saveOtp.save()
        
                return res.send("send otp for verification")
        }
        if(!user){
        const {name , email , countryCode} = req.body
        let validation = appUserValidation(req.body);
        
        if(validation && validation.error == true){
            return responseHandler.handler(res, false, validation.message , [], 422)
        }
        let checkUser = await User.find(
            {
                $or:[{phoneNumber:phoneNumber},{email:email}]
            })
            if(checkUser && checkUser[0]){
                return responseHandler.handler(res,true, message.customMessages.alreadyExists,[], 422)
            }
            let saveUser = new User({
            phoneNumber: phoneNumber,
            name: name,
            email: email,
            countryCode:countryCode
        })
        await saveUser.save()
        return responseHandler.handler(res,true,message.customMessages.userCreated,saveUser,201)
        }
            
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const verifyOtp = async(req,res) =>{
    try {
        const{phoneOTP} = req.body

        let verifyOtp = await OTP.findOne(
            {phoneOTP:phoneOTP , isExpire:false}
            )
            
        
        if(!verifyOtp){
            return responseHandler.handler(res,true, message.customMessages.otpNotFound,[], 422)
        }

        let date = new Date();
            
        let time = date.getTime()

        let timeTillSeconds = Math.floor(time/1000)
        
        if(timeTillSeconds-verifyOtp.otpExpireTime <= 90){

        if(verifyOtp.phoneOTP == phoneOTP){
            await OTP.updateOne({userId:req.query.userId},{$set:{isExpire:true}})

            const deleteToken = await Token.findOne({userId:req.query.userId}).deleteOne().exec()
            console.log('deleteToken :', deleteToken);
            const payload = {
                userId:verifyOtp.userId
                }
                
            const token = jwt.sign(payload , process.env.JWT_SECRET)   
    
            let hashedToken = encryptToken(token);
                
            let tokenCollection = new Token({
                token : hashedToken,
                userId: req.query.userId
            })
    
            await tokenCollection.save()
             
            return responseHandler.handler(res,true, message.customMessages.successLoggedIn,token, 201)
        }    
    }
    return res.send("otp time expires , resend otp")
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

const resendOTP = async(req,res) =>{
    try {
        let otp = generateOTP()

        await OTP.updateOne(
            {userId:req.query.userId , isExpire:false},
            {
                $set:{phoneOTP:otp}
            })    
        
        let verifyOtp = await OTP.findOne(
            {phoneOTP:otp , isExpire:false}
            )
            
        if(!verifyOtp){
            return responseHandler.handler(res,true, message.customMessages.otpNotFound,[], 422)
        }

        let date = new Date();
            
        let time = date.getTime()

        let timeTillSeconds = Math.floor(time/1000)

        await OTP.updateOne(
            {userId:req.query.userId , isExpire:false},
            {
                $set:{phoneOTP:otp , otpExpireTime:timeTillSeconds}
            })

        if(timeTillSeconds-verifyOtp.otpExpireTime <= 90){

            if(verifyOtp.phoneOTP == otp){

                await OTP.updateOne({userId:req.query.userId},{$set:{isExpire:true}})
                const payload = {
                    userId:verifyOtp.userId
                    }
                    
                const token = jwt.sign(payload , process.env.JWT_SECRET)   
        
                let hashedToken = encryptToken(token);
                    
                let tokenCollection = new Token({
                    token : hashedToken,
                    userId: req.query.userId
                })
        
                await tokenCollection.save()
                
                return responseHandler.handler(res,true, message.customMessages.successLoggedIn,token, 201)
            }    
    }
    return res.send("something went wrong")
    } catch (error) {
        console.log('error :', error);
        return responseHandler.handler(res,false, message.customMessages.error, [], 500)
    }
}

module.exports = {
    registerViaNumber,
    verifyOtp,
    resendOTP
}