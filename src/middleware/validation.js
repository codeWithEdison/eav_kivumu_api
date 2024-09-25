const joi = require('joi');

const validateRegister = (req, res, next) =>{
    const schema = joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).json({error: error.details[0].message})
        next();
}
module.exports = {validateRegister}