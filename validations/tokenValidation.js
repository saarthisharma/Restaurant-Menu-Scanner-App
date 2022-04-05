const Joi = require("joi");

const tokenValidation = (body) => {
    console.log('body :', body);
    const Schema = Joi.object({
        token: Joi.string().required(),
    });

    let error = false;
    let message = '';
    let validate = Schema.validate(body);
    console.log('validate :', validate);
    
    if(validate.error){
        message= validate.error.details[0].message;
        message = message.replace(/"/g, '')
        message = message[0].toUpperCase() + message.slice(1);
        error = true;
    }
    
    return {error: error, message: message};
};

module.exports = {tokenValidation}
// exports.tokenValidation = tokenValidation;