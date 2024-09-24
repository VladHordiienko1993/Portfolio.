const express = require("express");
const cors = require("cors");
const passport = require("passport");
const redis = require("redis");
const session = require('express-session');
const RedisStore = require('connect-redis').default  
const dotenv = require('dotenv');
const router = require("./routes");
const { errorHandler } = require("./middlewares/error.handler.mw");
const passportGoogle = require('./passports/passportGoogle');

const app = express();
dotenv.config();

// Настройка CORS
const corsOptions = {
  origin: 'https://hordiienko1.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsOptions));

// Настройка Redis клиента
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
});

// Логирование процесса подключения к Redis
redisClient.connect()
  .then(() => {
    console.log('Redis client connected successfully');
  })
  .catch((err) => {
    console.error('Redis Client Connection Error:', err);
  });

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// Настройка сессий с Redis хранилищем
app.use(session({
  store: new RedisStore({ client: redisClient }),
  name: "sid",
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "none",
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}, (err) => {
  if (err) {
    console.error('Session store error:', err);
  } else {
    console.log('Session stored successfully in Redis');
  }
}));
 

// Middleware для логирования сессии
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session.user);
  
  // Логирование сессии из Redis
  const sessionID = req.sessionID;  // Получаем ID текущей сессии
  redisClient.get(`sess:${sessionID}`, (err, data) => {
    if (err) {
      console.error('Error fetching session from Redis:', err);
    } else if (data) {
      console.log('Session in Redis:', data); // Логируем данные сессии из Redis
    } else {
      console.log('Session not found in Redis');
    }
  });

  next();
});

// Middleware для логирования куки
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
