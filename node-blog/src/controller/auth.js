const User = require('../model/User');
const ErrorResponse = require('../util/errorResponse');

/**
 * 
 * @desc Get all Bootcamps
 * @route GET api/v1/bootcamps/
 * @param Public
 */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        //Creat User
        const user = await User.create({
            name,
            email,
            password,
            role
        })

        //CREATE TOKEN 
        const token = user.getSignedJwtToken();

        res.status(201).json({
            status: true,
            token: token,
            data: user,
            message: ` User account has been created succesfully`
        })
    } catch (err) {
        next(err);
    }
}