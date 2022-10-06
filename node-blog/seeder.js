const fs = require('fs');
const mongoose = require('mongoose');
const color = require('colors');
const dotenv = require('dotenv');

//Load ENV vars
dotenv.config();

//Load DB
const Bootcamp = require('./src/model/bootCamp');
const Course = require('./src/model/course');
const User = require('./src/model/User');

//connect to DB 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})


//Read Json Files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))
const course = JSON.parse(fs.readFileSync(`${__dirname}/_data/course.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))

//Import into DB
const ImportDB = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(course);
        await User.create(users);
        console.log('Data Imported'.green.inverse)
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

//Delete data from DB
const DeleteDB = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed...'.red.inverse)
        process.exit();
    } catch (err) {
        console.error(err);
    }
}


if (process.argv[2] === '-i') {
    ImportDB();
} else if (process.argv[2] === '-d') {
    DeleteDB();
}