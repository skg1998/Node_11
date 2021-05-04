const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/db');
const PostRouter = require('./routes/postRoutes');
const UserRouter = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

//call db 
dbConnect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.get('/', (req, res) => {
    res.send("<h1> Hello world !!!</h1>");
})

app.use('/api/v1/posts', PostRouter);
app.use('/api/v1/users', UserRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});