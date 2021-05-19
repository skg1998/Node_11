const express = require('express');
const router = express.Router({ mergeParams: true });

const Course = require('../model/course');
const advancedResult = require('../middleware/advancedResult');
const { getCourse, getSingleCourse, addCourse, updateCourse, deleteCourse } = require('../controller/courses');

router.route('/').get(advancedResult(Course, {
    path: 'bootcamp',
    select: 'name description'
}), getCourse).post(addCourse)
router.route('/:id').get(getSingleCourse).put(updateCourse).delete(deleteCourse);

module.exports = router