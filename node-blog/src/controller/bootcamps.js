const path = require('path')
const Geocoder = require('../util/geoCoder');
const BootCamp = require('../model/bootCamp');
const ErrorResponse = require('../util/errorResponse');

/**
 * 
 * @desc Get all Bootcamps
 * @route GET api/v1/bootcamps/
 * @param Public
 */
exports.getallBootcamps = async (req, res, next) => {
    try {
        res.status(201).json(res.advancedResult)
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
        //Add user 
        req.body.user = req.user.id

        //check for Published bootcamp
        const publishedBootCamp = await BootCamp.findOne({ user: req.user.id })

        //if the user is not an admin, they can only add one bootcamp
        if (publishedBootCamp && req.user.role !== 'admin') {
            return next(new ErrorResponse(`The user with id ${req.user.id} has already published a bootcamp`, 400))
        }
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
        let bootcamp = await BootCamp.findById(req.params.id)

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamps not found with id of ${req.parama.id}`, 404))
        }

        //Make sure the User is owner
        if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse(`User ${req.parama.id} not authorized to update this bootcamp`, 404))
        }

        bootcamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

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
        const bootcamp = await BootCamp.findById(req.params.id)

        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamps not found with id of ${req.parama.id}`, 404))
        }

        //Make sure the User is owner
        if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse(`User ${req.parama.id} not authorized to update this bootcamp`, 404))
        }
        bootcamp.remove()
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

/**
 * 
 * @desc GET Bootcamps by redius
 * @route DELETE api/v1/bootcamps/:zipcode/:distance
 * @param Private
 */
exports.getBootcampsByRadius = async (req, res, next) => {
    try {
        const { zipcode, distance } = req.params;

        //get lat /lng from geocoder
        const loc = await Geocoder.geocode(zipcode);
        const lat = loc[0].latitude;
        const lng = loc[0].longitude;

        // calculate radius using radians
        // Divide dist by radius of earth
        // Earth radius is 3963 ml / and 6378 km
        const radius = distance / 3963;
        const bootcamp = await BootCamp.find({
            location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
        })
        res.status(201).json({
            succes: true,
            count: bootcamp.length,
            data: bootcamp,
            message: "find and delete bootcamp succesfully"
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Update Bootcamps photo
 * @route PUT api/v1/bootcamps/:id/:photo
 * @param Private
 */
exports.bootcampPhotoUpload = async (req, res, next) => {
    console.log("params", req.params.id);
    try {
        const bootcamp = await BootCamp.findById(req.params.id);
        if (!bootcamp) {
            return next(new ErrorResponse(`Bootcamps not found with id of ${req.parama.id}`, 404))
        }

        //Make sure the User is owner
        if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return next(new ErrorResponse(`User ${req.parama.id} not authorized to update this bootcamp`, 404))
        }

        if (!req.files) {
            return next(new ErrorResponse(`Please upload a file`, 404))
        }

        let file = req.files.file;

        //check file type
        if (!file.mimetype.startsWith('image')) {
            return next(new ErrorResponse(`Please upload a image`, 404))
        }

        //check file size
        if (file.size > process.env.MAX_FILE_UPLOAD) {
            return next(new ErrorResponse(`Please upload a image less than ${process.env.MAX_FILE_UPLOAD}`, 404))
        }

        //custom file name
        file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`

        file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
            console.log(err);
            return next(new ErrorResponse(`Problem with file upload`, 500))
        })

        await BootCamp.findByIdAndUpdate(req.params.id, { photo: file.name })
        res.status(201).json({
            succes: true,
            data: file.name,
            message: "file upload succesfully !"
        })
    } catch (err) {
        next(err);
    }
}