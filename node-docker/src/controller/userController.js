const User = require('../modal/userModal');

const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const data = {
            username: username,
            password: password
        }
        const newUser = await User.create(data);
        res.status(201).json({
            status: "succes",
            data: newUser
        })
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }
}

module.exports = {
    signup
}