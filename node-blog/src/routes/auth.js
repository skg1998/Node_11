const express = require('express')
const router = express.Router();
const { register } = require('../controller/auth');

router.route('/register').post(register)

module.exports = router