const Joi = require("joi")
const appUserValidation = (body) =>{
    const Schema = Joi.object({
        phoneNumber: Joi.number().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        countryCode: Joi.string().required()
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
module.exports={appUserValidation}
