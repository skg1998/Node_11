
const hasAuthorization = (req, res, next) => {
    try {
        const { user } = req.session;
        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "not authorized"
            })
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
}

module.exports = { hasAuthorization };