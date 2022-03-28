const res = require("express/lib/response")

const handler = (res , error , message , data , status)=>{
    if(!error){
        return res.status(status).json({
            message,
            status: false,
            code: status,
            data: data
        })
    }
    else{
        return res.status(status).json({
            message,
            status: error,
            code: status,
            data: data
        })
    }
}
module.exports = {
    handler
}