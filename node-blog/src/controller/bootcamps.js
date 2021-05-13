const BootCamp = require('../modal/bootCamp');

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
    } catch (e) {
        res.status(400).json({
            succes: false,
            message: "Something went wrong !"
        })
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
            return res.status(400).json({
                succes: false,
                data: bootcamp.length,
                bootcamp: {},
                message: "Not find the bootcamp of given id"
            })
        }
        res.status(200).json({
            succes: true,
            data: bootcamp.length,
            bootcamp: bootcamp,
            message: "Get bootcamp of given id succesfully"
        })
    } catch (e) {
        res.status(400).json({
            succes: false,
            message: "Something went wrong"
        })
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
    } catch (e) {
        res.status(400).json({
            succes: false,
            message: "Something went wrong"
        })
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
            res.status(401).json({
                succes: false,
                data: bootcamp.length,
                bootcamp: {},
                message: "didnot find id to update"
            })
        }

        res.status(201).json({
            succes: true,
            data: bootcamp.length,
            bootcamp: bootcamp,
            message: "find and update bootcamp succesfully"
        })
    } catch (e) {
        res.status(400).json({
            succes: false,
            message: "Something went wrong"
        })
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
            res.status(401).json({
                succes: false,
                data: bootcamp.length,
                bootcamp: {},
                message: "didnot find id to delete"
            })
        }

        res.status(201).json({
            succes: true,
            data: bootcamp.length,
            bootcamp: bootcamp,
            message: "find and delete bootcamp succesfully"
        })
    } catch (e) {
        res.status(400).json({
            succes: false,
            message: "Something went wrong"
        })
    }
}