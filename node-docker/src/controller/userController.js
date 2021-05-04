const User = require('../modal/userModal');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashpassword = bcrypt.hash(password, 12);
        const data = {
            username: username,
            password: hashpassword
        }
        const newUser = await User.create(data);
        res.status(201).json({
            status: "succes",
            data: newUser
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "fail"
        })
    }
}

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.find({ username });
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (comparePassword) {
            res.status(201).json({
                status: "succes"
            })
        } else {
            res.status(404).json({
                status: "fail",
            })
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: "fail"
        })
    }
}

module.exports = {
    signup,
    login
}