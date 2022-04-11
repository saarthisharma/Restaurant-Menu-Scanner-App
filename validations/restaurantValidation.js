const Joi = require("joi")
const restaurantValidation = (body) =>{
    const Schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        countryCode: Joi.string().required(),
        contactNumber: Joi.number().required(),
        countryName: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        cuisines: Joi.array().required(),
        openingTime: Joi.string().required(),
        closingTime: Joi.string().required(), 
        acceptedCurrency: Joi.array().required(),
        createdBy: Joi.string().required()        
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
module.exports={restaurantValidation}
