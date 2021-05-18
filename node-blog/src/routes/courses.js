const express = require('express');
const router = express.Router();
const { getCourse } = require('../controller/courses');

router.route('/').get(getCourse)

module.exports = router