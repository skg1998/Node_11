const express = require('express')
const router = express.Router();
const { protect } = require('../middleware/hasAuth');
const { register, login, getMe, forgotPassword, resetPassword, updateDetail, logout } = require('../controller/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(protect, getMe);
router.route('/updateDetail').put(protect, updateDetail);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:resetToken').put(resetPassword);

module.exports = router