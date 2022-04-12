const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const User = require("../Model/user")
const Token = require("../Model/tokens");

const managerAuthorization = async(req,res,next)=> {
    try {
        const token = req.header("token")
        console.log('token :', token);

        const secret = process.env.CRYPTO_SECRET;
        
        const hash = crypto.createHash('sha256', secret).update(token).digest('hex');

        const matchToken = await Token.findOne({token:hash})


        if(hash == matchToken.token){

            // verify the token received in the header
            jwt.verify(token,process.env.JWT_SECRET,async function(error,data){
                if(error){
                    return res.status(401).send("unauthorized access")
                }
                
                let user = await User.findOne({"_id":data._id}).lean();
            
                if(!user){
                    return res.status(401).send("unauthorized access")
                }

                if(user.userType != 3 ){
                    return res.status(401).send("unauthorized access")
                }
                req.user = user
                req.token = token
                next()
        });
        }
        
    } catch (error) {
        console.log(error)
        return res.status(401).send("unauthorized access")
    }
}
module.exports = {
    managerAuthorization
}