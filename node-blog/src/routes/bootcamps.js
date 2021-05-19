const express = require('express');
const router = express.Router();
const advancedResult = require('../middleware/advancedResult');
const BootCamp = require('../model/bootCamp');
const { getallBootcamps, getBootcamp, updateBootcamp, createBootcamp, deleteBootcamp, getBootcampsByRadius, bootcampPhotoUpload } = require('../controller/bootcamps');

//Includes other resource routers
const courseRouter = require('./courses')

//Re-route in other source routers
router.use('/:bootcampId/courses', courseRouter)

router.route('/').get(advancedResult(BootCamp, 'courses'), getallBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);
router.route('/radius/:zipcode/:distance').get(getBootcampsByRadius);
router.route('/:id/photo').put(bootcampPhotoUpload)

module.exports = router