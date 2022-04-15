// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken")
// const crypto = require("crypto");
// const User = require("../Model/user")
// const Token = require("../Model/tokens");

// const singleDeviceAuthorization = async(req,res,next) => {
//     try {
//         // const token = req.header("token")
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU2YWNmY2UzYzdiNzNlNWMwM2ZmYWUiLCJpYXQiOjE2NDk4NTMzMzh9.D6L481TIBo7UwCoUEv1eLk8lt2UDwoLJnaPUu1VCDYM"

//         const secret = process.env.CRYPTO_SECRET;
        
//         const hash = crypto.createHash('sha256', secret).update(token).digest('hex');

//         const matchToken = await Token.findOne({token:hash})


//         if(hash == matchToken.token){
//             console.log("matching")

//         //     // verify the token received in the header
//         //     jwt.verify(token,process.env.JWT_SECRET,async function(error,data){
//         //         if(error){
//         //             return res.status(401).send("unauthorized access")
//         //         }
                
//         //         let user = await User.findOne({"_id":data._id}).lean();
            
//         //         if(!user){
//         //             return res.status(401).send("unauthorized access")
//         //         }

//         //         if(user.userType != 3 ){
//         //             return res.status(401).send("unauthorized access")
//         //         }
//         //         req.user = user
//         //         req.token = token
//         //         next()
//         // });
//         }
//         console.log("not matching")
        
//     } catch (error) {
//         console.log(error)
//         return res.status(401).send("unauthorized access")
//     }
// }
// module.exports = {
//     singleDeviceAuthorization
// }