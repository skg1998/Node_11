const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/db');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');

const redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

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
app.enable('trust proxy');
app.use(cors({}));
app.use(session({
    store: new RedisStore({
        client: redisClient
    }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }
}))

app.get('/', (req, res) => {
    res.send("<h1> Hello world !!!</h1>");
})

app.use('/api/v1/posts', PostRouter);
app.use('/api/v1/users', UserRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});