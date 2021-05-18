const course = require('../model/course');
const Course = require('../model/course');
const ErrorResponse = require('../util/errorResponse');

/**
 * @desc Get Courses
 * @route GET /api/v1/courses
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 * @access Public
 */
exports.getCourse = async (req, res, next) => {
    try {
        let query;
        if (req.params.bootcampId) {
            query = Course.find({ bootcamp: req.params.bootcampId })
        } else {
            query = Course.find();
        }

        const courses = await query;
        res.status(201).json({
            status: false,
            count: courses.length,
            data: courses,
            message: "All courses get succesfully !"
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: ""
        })
    }
}