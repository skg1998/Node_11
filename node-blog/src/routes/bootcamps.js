const express = require('express');
const router = express.Router();
const { getallBootcamps, getBootcamp, updateBootcamp, createBootcamp, deleteBootcamp, getBootcampsByRadius } = require('../controller/bootcamps');

router.route('/').get(getallBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);
router.route('/:zipcode/:distance').get(getBootcampsByRadius);

module.exports = router