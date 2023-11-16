const mongoose = require('mongoose');
require('colors');

const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        if (conn) {
            console.log(`MongoDB: ${conn.connection.host}`.cyan.underline)
        }
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectDatabase;
