const User = require('../model/User');
const ErrorResponse = require('../util/errorResponse');

/**
 * 
 * @desc create User account
 * @route POST api/v1/auth/register
 * @param Public
 */
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        //Creat User
        const user = await User.create({ name, email, password, role })

        sendTokenResponse(user, 200, res, "account has been created successfully !");
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc login into account
 * @route POST api/v1/auth/login
 * @param Public
 */
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //Validate email & password
        if (!email && !password) {
            return next(new ErrorResponse('Please Provide an email and password', 400))
        }

        // Check for user
        const user = await User.findOne({ email: email }).select('+password');
        if (!user) {
            return next(new ErrorResponse('Invalid credentials User not found', 401));
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }

        sendTokenResponse(user, 200, res, "login  successfully !");
    } catch (err) {
        next(err);
    }
}

//get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res, message) => {
    //Create Token
    const token = user.getSignedJwtToken();

    const option = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === 'production') {
        option.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, option)
        .json({
            success: true,
            token: token,
            message: message
        })
}

/**
 * 
 * @desc get account
 * @route POST api/v1/auth/login
 * @param Private
 */
exports.getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    })
}