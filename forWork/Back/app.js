const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require("redis");
const dotenv = require('dotenv');
const router = require("./routes");
const  {errorHandler}  = require("./middlewares/error.handler.mw");
const passportGoogle = require('./passports/passportGoogle');



const app = express();
dotenv.config();
//http://localhost:3001
app.use(cors({origin:'https://main--hordiienko1.netlify.app',methods:'GET,POST,PUT,DELETE,PATCH',credentials:true}))

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
  // socket: {
  //   tls: true,   // Добавьте этот параметр для использования TLS
  //   rejectUnauthorized: false, // Если возникает проблема с сертификатами, можно временно отключить проверку
  // }
});

// Более подробное логирование процесса подключения
redisClient.connect()
  .then(() => {
    console.log('Redis client connected successfully');
  })
  .catch((err) => {
    console.error('Redis Client Connection Error:', err);
  });

// Логирование ошибок Redis
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