require('dotenv').config({ debug: true })
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const color = require('colors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Router files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

//connect Database
connectDB();

//express json
app.use(express.json())

//File Upload
app.use(fileUpload());

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'succes',
        message: 'ok'
    })
})

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Mount Routes
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

//error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is listen in ${process.env.NODE_ENV} on ${PORT} `.yellow.bold);
});

//Handle unHandled Promises rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message} `.red);
    //close server and exit process
    app.close(() => process.exit())
})