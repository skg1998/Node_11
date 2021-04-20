const UserController = require('../controller/user.controller');
const { hasAuthorization } = require('../middleware/requireAuth');
const express = require('express');
const router = express.Router();

router.post('/login', hasAuthorization, UserController.login);
router.get('/signup', UserController.signup);
router.get('/getalluser', UserController.getAll);
router.delete('/deleteuser', hasAuthorization, UserController.deleteUser);
router.put('/updateuser', hasAuthorization, UserController.updateUser);