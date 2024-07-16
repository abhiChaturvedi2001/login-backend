// joi is a library which helps to valdate the user credentials at the time of login
const joi = require('joi');

exports.singUpValidation = (req, res, next) => {
    // validation kr rahe hai with the help of joi 
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    })

    // yeah schmea ko validate krega aur validate function alrady bana hua hau 
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: "bad Requires", error: error
        })
    }
    next();
}
exports.LoginValidation = (req, res, next) => {
    // validation kr rahe hai with the help of joi 
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    })

    // yeah schmea ko validate krega aur validate function alrady bana hua hau 
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: "bad Requires", error: error
        })
    }
    next();
}