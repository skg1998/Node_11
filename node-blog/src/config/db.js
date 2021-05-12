const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("process.env.MONGO_URL", process.env.MONGO_URL);
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/dev_api", {
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