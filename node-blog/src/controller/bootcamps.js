const BootCamp = require('../modal/bootCamp');
const ErrorResponse = require('../util/errorResponse');

/**
 * 
 * @desc Get all Bootcamps
 * @route GET api/v1/bootcamps/
 * @param Public
 */
exports.getallBootcamps = async (req, res, next) => {
    try {
        const bootcamp = await BootCamp.find();
        res.status(201).json({
            succes: true,
            data: bootcamp.length,
            bootcamp: bootcamp,
            message: "Get all bootcamps succesfully !"
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Get Bootcamp
 * @route GET api/v1/bootcamps/:id
 * @param Public
 */
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await BootCamp.findById(req.params.body);
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamps not found with id of ${req.parama.id}`, 404))
        }
        res.status(200).json({
            succes: true,
            data: bootcamp.length,
            bootcamp: bootcamp,
            message: "Get bootcamp of given id succesfully"
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Crete Bootcamps
 * @route POST api/v1/bootcamps/create
 * @param Private
 */
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await BootCamp.create(req.body);
        res.status(201).json({
            succes: true,
            data: bootcamp.length,
            bootcamp: bootcamp,
            message: "show all bootcamps"
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Update Bootcamps
 * @route PUT api/v1/bootcamps/:id
 * @param Private
 */
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamps not found with id of ${req.parama.id}`, 404))
        }

        res.status(201).json({
            succes: true,
            data: bootcamp.length,
            bootcamp: bootcamp,
            message: "find and update bootcamp succesfully"
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Delete Bootcamps
 * @route DELETE api/v1/bootcamps/:id
 * @param Private
 */
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await BootCamp.findByIdAndDelete(req.params.id)

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamps not found with id of ${req.parama.id}`, 404))
        }

        res.status(201).json({
            succes: true,
            data: bootcamp.length,
            bootcamp: bootcamp,
            message: "find and delete bootcamp succesfully"
        })
    } catch (err) {
        next(err);
    }
}