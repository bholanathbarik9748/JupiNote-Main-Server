const jwt = require('jsonwebtoken');
require('dotenv').config();

const requireAuth = (req, res, next) => {
    const authToken = req.cookies.authToken;

    if (!authToken) {
        res.status(500).json({
            success: false,
            message: "You are not authorized to perform this operation."
        });
    }

    jwt.verify(authToken, process.env.AuthToken, (err, deCodeToken) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "You are not authorized to perform this operation. "
            });
        } else {
            next();
        }
    })
}

module.exports = { requireAuth };