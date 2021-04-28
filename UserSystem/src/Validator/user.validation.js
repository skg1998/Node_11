const { body } = require('express-validator');

const signupValidation = [
    body('username').not().isEmpty().withMessage('username must not empty '),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
]

const loginValidation = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is compulsory'),
]

module.exports = { signupValidation, loginValidation };