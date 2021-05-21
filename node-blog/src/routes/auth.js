const express = require('express')
const router = express.Router();
const { protect } = require('../middleware/hasAuth');
const { register, login, getMe, forgotPassword } = require('../controller/auth');

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, getMe)
router.route('/forgotPassword').post(forgotPassword);

module.exports = router