const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

const deleteAllUsers = async (req, res) => {
    User.deleteMany({})
        .then(() => {
            res.status(200).json({ message: "Successfully deleted all users" })
        })
        .catch((error) => {
            res.status(200).json({ error: error.message })
        })
}

module.exports = {
    signupUser,
    loginUser,
    deleteAllUsers
}