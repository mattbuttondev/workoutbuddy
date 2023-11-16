const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must include an authorization token" })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne({ _id: id }).select('_id')
        next()
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = requireAuth;