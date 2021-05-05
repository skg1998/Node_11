const User = require('../modal/userModal');
const bcrypt = require('bcryptjs');

const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 12);
        const data = {
            username: username,
            password: hashpassword
        }
        const newUser = await User.create(data);
        req.session.user = newUser;
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

        const comparePassword = await bcrypt.compare(password, user[0].password);

        if (comparePassword) {
            req.session.user = user;
            res.status(201).json({
                status: "succes",
                message: "user login succesfull"
            })
        } else {
            res.status(404).json({
                status: "fail",
                message: "incorrect username or password"
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