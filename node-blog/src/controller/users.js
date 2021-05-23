const User = require('../model/User');
const ErrorResponse = require('../util/errorResponse');

/**
 * 
 * @desc Get All Users
 * @route GET api/v1/auth/users
 * @access Private/Admin
 */
exports.getUsers = async (req, res, next) => {
    try {
        res.status(200).json(res.advancedResults);
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Get All Users
 * @route GET api/v1/auth/users:id
 * @access Private/Admin
 */
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: user,
            message: `Get user ${req.params.id} Successfully !`
        })
    } catch (err) {
        next(err);
    }
}


/**
 * 
 * @desc Create Users
 * @route POST api/v1/auth/users
 * @access Private/Admin
 */
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            success: true,
            data: user,
            message: `Get user ${req.params.id} Successfully !`
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Update Users
 * @route PUT api/v1/auth/users/:id
 * @access Private/Admin
 */
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: user,
            message: `Get user ${req.params.id} Successfully !`
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Delete Users
 * @route DELETE api/v1/auth/users/:id
 * @access Private/Admin
 */
exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: `Get user ${req.params.id} Successfully !`
        })
    } catch (err) {
        next(err);
    }
}