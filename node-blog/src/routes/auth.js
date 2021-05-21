const express = require('express')
const router = express.Router();
const { protect } = require('../middleware/hasAuth');
const { register, login, getMe } = require('../controller/auth');

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/me').get(protect, getMe)

module.exports = router