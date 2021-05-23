const User = require('../model/User');
const ErrorResponse = require('../util/errorResponse');
const sendEmail = require('../util/sendEmail');
const crypto = require('crypto');

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
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc Log user out/ clear cookie
 * @route POST api/v1/auth/logout
 * @param Private
 */
exports.logout = async (req, res, next) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        })
        res.status(200).json({
            success: true,
            data: {},
            message: "User logout successfully !"
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc update account
 * @route PUT api/v1/auth/updateDetail
 * @param Private
 */
exports.updateDetail = async (req, res, next) => {
    try {
        const feildToUpdate = {
            name: req.body.name,
            email: req.body.email
        }

        const user = await User.findByIdAndUpdate(req.user.id, feildToUpdate, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc forgot password
 * @route POST api/v1/auth/forgotPassword
 * @param Public
 */
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return next(new ErrorResponse('User not found', 401));
        }

        //Get Reset token
        const resetToken = user.getResetPasswordToken();

        //create reset url
        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetPassword/${resetToken}`;

        const message = `You are receiving this email because you or (someone else) has requested the reset of password. Please make a PUT request to: \n\n ${resetUrl}`
        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Token',
                message: message
            })
            res.status(200).json({
                success: true,
                data: 'Email has been sent to your registered email !'
            })
        } catch (err) {
            console.log('err', err)
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false })
            return next(new ErrorResponse('Email could not be sent', 500))
        }

        await user.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        next(err);
    }
}

/**
 * 
 * @desc reset Password
 * @route PUT api/v1/auth/resetPassword
 * @param Public
 */
exports.resetPassword = async (req, res, next) => {
    try {
        //Get hashed Token
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return next(new ErrorResponse('Invalid Token ', 400))
        }

        //Set password
        user.passord = req.body.passord;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendTokenResponse(user, 200, res, "Password has been updated successfully !");
    } catch (err) {
        next(err);
    }
}