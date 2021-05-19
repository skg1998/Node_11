const Course = require('../model/course');
const BootCamp = require('../model/bootCamp')
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
            query = Course.find().populate({
                path: 'bootcamp',
                select: 'name description'
            });
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

/**
 * @desc Get single Courses
 * @route GET /api/v1/courses/id
 * @access Public
 */
exports.getSingleCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id).populate({
            path: 'bootcamp',
            select: 'name description'
        });

        if (!course) {
            return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404)
        }
        res.status(201).json({
            status: false,
            count: course.length,
            data: course,
            message: `course of given id: ${req.params.id} get succesfully !`
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: ""
        })
    }
}

/**
 * @desc Add single Courses
 * @route POST /api/v1/bootcamps/:bootcampId/courses
 * @access Private
 */
exports.addCourse = async (req, res, next) => {
    try {
        req.body.bootcamp = req.params.bootcampId;
        const bootcamp = await BootCamp.findById(req.params.bootcampId)

        if (!bootcamp) {
            return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`), 404)
        }

        const course = await Course.create(req.body);
        res.status(201).json({
            status: false,
            data: course,
            message: `course of given id: ${req.params.id} create succesfully !`
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: ""
        })
    }
}

/**
 * @desc Update Courses
 * @route PUT /api/v1/courses/:id
 * @access Private
 */
exports.updateCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id)

        if (!course) {
            return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404)
        }

        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: true,
            data: course,
            message: `course of given id: ${req.params.id} update succesfully !`
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: `No course with the id of ${req.params.id}`
        })
    }
}

/**
 * @desc Delete Courses
 * @route DELETE /api/v1/courses/:id
 * @access Private
 */
exports.deleteCourse = async (req, res, next) => {
    try {
        let course = await Course.findById(req.params.id)

        if (!course) {
            return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404)
        }
        await course.remove();

        res.status(201).json({
            status: true,
            message: `course of given id: ${req.params.id} delete succesfully !`
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: `No course with the id of ${req.params.id}`
        })
    }
}