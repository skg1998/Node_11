const express = require('express');
const router = express.Router();
const { getallBootcamps, getBootcamp, updateBootcamp, createBootcamp, deleteBootcamp } = require('../controller/bootcamps');

router.route('/').get(getallBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

module.exports = router