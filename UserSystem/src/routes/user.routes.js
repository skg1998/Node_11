const UserController = require('../controller/user.controller');
const { hasAuthorization } = require('../middleware/requireAuth');
const { loginValidation, signupValidation } = require('../Validator/user.validation');
const express = require('express');
const router = express.Router();

router.post('/login', hasAuthorization, loginValidation, UserController.login);
router.get('/signup', signupValidation, UserController.signup);
router.get('/getalluser', UserController.getAll);
router.delete('/deleteuser', hasAuthorization, UserController.deleteUser);
router.put('/updateuser', hasAuthorization, UserController.updateUser);