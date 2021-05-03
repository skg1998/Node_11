const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config');

const connectDB = () => {
    mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
        .then(() => console.log("Succesfully connected to DB"))
        .catch((e) => {
            console.log(e);
            setTimeout(connectDB, 5000);
        });
}

module.exports = connectDB;