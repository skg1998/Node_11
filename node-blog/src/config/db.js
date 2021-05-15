const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)
    } catch (e) {
        console.log(`Error occure in database connection: ${e}`.red)
    }
}

module.exports = connectDB;