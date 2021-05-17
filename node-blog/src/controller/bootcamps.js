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
        let query;

        //copy query Request
        const reqQuery = { ...req.query };

        //Feilds to exclude
        const removeFeilds = ['select', 'sort', 'page', 'limit'];

        //Loop over removeFeilds and delete them reqQuery
        removeFeilds.forEach(param => delete reqQuery[param])

        console.log(reqQuery);

        //create query String 
        let queryStr = JSON.stringify(reqQuery)

        //create operators ($gt, $gte, $lt, $lte, $in) 
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

        //Finding resource
        query = BootCamp.find(JSON.parse(queryStr));

        //SELECT query
        if (req.query.select) {
            const feilds = req.query.select.split(',').join(' ');
            query = query.select(feilds)
        }

        //SORT query
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy)
        } else {
            query = query.sort('-created_At')
        }

        //PAGINATION query
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await BootCamp.countDocuments();
        query = query.skip(startIndex).limit(limit)

        //Existing Query
        const bootcamp = await query;

        //PAGINATION result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit: limit
            }
        }

        res.status(201).json({
            succes: true,
            count: bootcamp.length,
            pagination: pagination,
            data: bootcamp,
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