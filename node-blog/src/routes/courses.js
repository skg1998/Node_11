const express = require('express');
const router = express.Router({ mergeParams: true });
const { getCourse, getSingleCourse, addCourse, updateCourse, deleteCourse } = require('../controller/courses');

router.route('/').get(getCourse).post(addCourse)
router.route('/:id').get(getSingleCourse).put(updateCourse).delete(deleteCourse);

module.exports = router