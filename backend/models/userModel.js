const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error("You must include all fields")
    }

    if (!validator.isEmail(email)) {
        throw Error("You must enter a valid email")
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("A user with this email already exists")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hashedPassword })

    return user
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("You must include all fields")
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error("User not found")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)