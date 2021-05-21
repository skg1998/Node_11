const express = require('express');
const router = express.Router({ mergeParams: true });
const { protect, authorize } = require('../middleware/hasAuth');
const Course = require('../model/course');
const advancedResult = require('../middleware/advancedResult');
const { getCourse, getSingleCourse, addCourse, updateCourse, deleteCourse } = require('../controller/courses');

router
    .route('/')
    .get(advancedResult(Course, {
        path: 'bootcamp',
        select: 'name description'
    }), getCourse)
    .post(protect, authorize('publisher', 'admin'), addCourse)

router
    .route('/:id')
    .get(getSingleCourse)
    .put(protect, authorize('publisher', 'admin'), updateCourse)
    .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router