const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require("redis");
const dotenv = require('dotenv');
const router = require("./routes");
const  {errorHandler}  = require("./middlewares/error.handler.mw");
const passportGoogle = require('./passports/passportGoogle');



const app = express();
dotenv.config();

app.use(cors({origin:'https://main--hordiienko1.netlify.app',methods:'GET,POST,PUT,DELETE,PATCH',credentials:true}))

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
});
redisClient.connect().catch(console.error);

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});


app.use(session({
  store: new RedisStore({ client: redisClient }),  
  secret: process.env.COOKIE_KEY,                  
  resave: false,                                   
  saveUninitialized: false,                       
  cookie: {
    sameSite: "strict",                           
    maxAge: 24 * 60 * 60 * 1000                    
  }
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(express.static('public'));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
module.exports = app;