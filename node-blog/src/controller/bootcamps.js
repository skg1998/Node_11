/**
 * 
 * @desc Get all Bootcamps
 * @route GET api/v1/bootcamps/
 * @param Public
 */
exports.getallBootcamps = (req, res, next) => {
    res.status(200).json({
        succes: true,
        message: "show all bootcamps"
    })
}

/**
 * 
 * @desc Get Bootcamp
 * @route GET api/v1/bootcamps/:id
 * @param Public
 */
exports.getBootcamp = (req, res, next) => {
    res.status(200).json({
        succes: true,
        message: "show all bootcamps"
    })
}

/**
 * 
 * @desc Crete Bootcamps
 * @route POST api/v1/bootcamps/create
 * @param Public
 */
exports.createBootcamp = (req, res, next) => {
    res.status(200).json({
        succes: true,
        message: "show all bootcamps"
    })
}

/**
 * 
 * @desc Update Bootcamps
 * @route PUT api/v1/bootcamps/:id
 * @param Public
 */
exports.updateBootcamp = (req, res, next) => {
    res.status(200).json({
        succes: true,
        message: "Update bootcamps"
    })
}

/**
 * 
 * @desc Delete Bootcamps
 * @route DELETE api/v1/bootcamps/:id
 * @param Public
 */
exports.deleteBootcamp = (req, res, next) => {
    res.status(200).json({
        succes: true,
        message: "delete bootcamps"
    })
}