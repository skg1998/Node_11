const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const expressLayouts = require('express-ejs-layouts');
const cors= require('cors');
const flash = require('express-flash');
const Index = require('./routes/index');

const port = process.env.PORT || 5000;

const app = express();

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');
app.engine('ejs', require('ejs').__express);

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//cors
app.use(cors());

//session
app.use(session({ secret: 'session secret key' }));

//flaSH
app.use(flash());
app.use(function(req, res, next){
  res.locals.messages = req.flash();
  next();
});

//Routes
app.use('/',Index);


//Express-session
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true
}));

//mongoose connection
const mongoURI = 'mongodb://localhost:27017/ZoomClone';
mongoose.connect(mongoURI ,{ useUnifiedTopology: true }).then(()=>{
  console.log("MongoDb connected...")
}).catch(err=>{
   console.log(err)
  });


//listining on port 3000
app.listen(port,()=>{
  console.log("server is runing on port :" + port)
});
