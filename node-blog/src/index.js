require('dotenv').config({ debug: true })
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const color = require('colors');
const fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require("helmet");
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit')
const cors = require('cors')

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Router files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const Auth = require('./routes/auth');
const User = require('./routes/users');
const Review = require('./routes/Reviews');

const app = express();

//connect Database
connectDB();

//express json
app.use(express.json())

//File Upload
app.use(fileUpload());

//cookie
app.use(cookieParser())

// To remove data,  or Sanitize data
app.use(mongoSanitize());

//Set Security header
app.use(helmet());

//Set xss
app.use(xss());

//rate limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, //10 mins
    max: 10
})
app.use(limiter);

//Prevent http params Pollution
app.use(hpp())

//Enable cors
app.use(cors())

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
app.use('/api/v1/auth', Auth);
app.use('/api/v1/users', User)
app.use('api/v1/reviews', Review)

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