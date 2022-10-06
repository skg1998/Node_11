const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helment = require('helmet');
const port = process.env.PORT || 1337;
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(helment());
app.use(express.json());
app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.json({
        message: 'cdg.sh - Short Url for your code'
    })
})

app.get('/url/:id', (req, res) => {
    //TODO: get a shortURL by id
})

app.get('/:id', (req, res) => {
    //TODO: redirect to URL
})


app.post('/', (req, res) => {
    //TODO: Create a URL
})


app.listen(port, () => {
    console.log(`Listen at http://localhost/${port}`);
})