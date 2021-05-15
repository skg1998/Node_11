require('dotenv').config({ debug: true })
const express = require('express');
const morgan = require('morgan');
const color = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//connect Database
connectDB();

//Router files
const bootcamps = require('./routes/bootcamps');

const app = express();

//express json
app.use(express.json())

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