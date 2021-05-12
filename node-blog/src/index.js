const express = require('express');
const dotenv = require('dotenv');

const app = express();

//Load env var
dotenv.config({ path: './config/config.env' })

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is listen in ${process.env.NODE_ENV} on ${PORT} `);
});