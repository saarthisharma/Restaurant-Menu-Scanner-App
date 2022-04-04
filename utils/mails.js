const ejs  = require("ejs")
const express = require("express");
const { gmail } = require("googleapis/build/src/apis/gmail");
const app = express();
const path = require("path")
app.set("view engine", "ejs");
const {sendEmail} = require("./mailer")

// reset password email
const resetPasswordMail = async (email, token) =>{
    let url = "http://localhost:3000/forgot-password/"+token
    console.log('url :', url);
    let filepath = path.join(__basedir, "views", "templates", "forgotPassword.ejs");

    ejs.renderFile(filepath , {URL : url}, function(error , data){
        if(error){
            console.log('error :', error);
        }
        else{
            sendEmail({
                subject: "Test",
                text: "forgot password email",
                to: "testmail@yopmail.com",
                from: process.env.EMAIL,
                generateTextFromHTML: true,
                html: data
            });

            console.log("export mail is working")
        }
    })   
}

module.exports = {
    resetPasswordMail
}

