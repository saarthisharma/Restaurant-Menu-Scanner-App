const Joi = require("joi")
const menuValidation = (body) =>{
    const Schema = Joi.object({
        restaurantId: Joi.string().required(), 
        categoryId:Joi.string().required() , 
        name:Joi.string().required(), 
        tags:Joi.array().required(), 
        price:Joi.number().required()
    });
    let error = false;
    let message = '';
    let validate = Schema.validate(body);
    
    if(validate.error){
        message= validate.error.details[0].message;
        message = message.replace(/"/g, '')
        message = message[0].toUpperCase() + message.slice(1);
        error = true;
    }
    
    return {error: error, message: message};
}
module.exports={menuValidation}
