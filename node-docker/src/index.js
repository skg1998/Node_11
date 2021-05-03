const express = require('express');
const dbConnect = require('./config/db');
const PostRouter = require('./routes/postRoutes');

const app = express();
const port = process.env.PORT || 3000;

dbConnect();

app.get('/', (req, res) => {
    res.send("<h1> Hello world !!!</h1>");
})

app.use('/api/posts', PostRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});