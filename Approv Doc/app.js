const express = require('express');
const FilesRoute = require('./routes/files');
//const ShowFileRoute = require('./routes/showFile');
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db');
connectDB();

//routes
app.use('/api/files',FilesRoute);
//app.use('/files',ShowFileRoute);


app.listen(port, () => {
    console.log(`App listening on port : ${port} !`);
});