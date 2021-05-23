const jwt = require('jsonwebtoken')
const User = require('../model/User');
const ErrorResponse = require('../util/errorResponse');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        //Set token from Bearer token header
        token = req.headers.authorization.split(" ")[1]
    }
    //Set token from cookies
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    //Make sure token exist
    if (!token) {
        return next(new ErrorResponse('Not Authorized to access this route', 401))
    }

    try {
        //verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode)
        req.user = await User.find(decode.id)
    } catch (err) {
        return next(new ErrorResponse('Not Authorized to access this route', 401))
    }
}

//Grant access to role
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is Not Authorized to access this route`, 403))
        }
        next();
    }
}
