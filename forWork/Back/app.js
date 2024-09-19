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
const corsOptions = {
  origin: 'https://hordiienko1.netlify.app',  // Укажите точный домен вашего фронтенда
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],  // Включите PUT и PATCH
  credentials: true  // Для передачи cookies
};
app.use(cors(corsOptions));






const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
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
    sameSite: "none",      
    secure: true,              
    httpOnly: true,       
    maxAge: 24 * 60 * 60 * 1000                    
  }
}));
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session);
  next();
});


app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  next();
});

app.use(passport.initialize());
app.use(passport.session());



app.use(express.static('public'));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
module.exports = app;