const mongoose = require('mongoose');
require('dotenv').config();

function connection(){
    mongoose.connect(process.env.MONGO_CONNECTION_URL,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    });
    const conn = mongoose.connection;

    conn.once('open', ()=>{
        console.log('Database connection');
    }).catch(err =>{
        console.log('Database failed');
    })
}

module.exports = connection;