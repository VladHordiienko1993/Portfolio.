const express = require("express");
const cors = require("cors");
const passport = require("passport");
const redis = require("redis");
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const dotenv = require('dotenv');
const router = require("./routes");
const { errorHandler } = require("./middlewares/error.handler.mw");
const passportGoogle = require('./passports/passportGoogle');

dotenv.config();
const app = express();
//http://localhost:3000
//https://hordiienko1.netlify.app
// Настройка CORS
const corsOptions = {
  origin: 'https://hordiienko1.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
};
app.use(cors(corsOptions));
//REDIS_URL=redis://red-crhd8t08fa8c7390avm0:6379
//REDIS_URL=rediss://red-crhd8t08fa8c7390avm0:8EZbXtO5UbbxavbPCpNwf06YmsUxBLo2@frankfurt-redis.render.com:6379
// Настройка Redis-клиента без legacyMode
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
 
});

// Подключение к Redis
redisClient.connect()
  .then(async () => {
    console.log('Connected to Redis successfully');

    // Тестовая запись и чтение данных в Redis
    try {
      await redisClient.set('foo', 'bar');  // Устанавливаем ключ 'foo' со значением 'bar'
      const value = await redisClient.get('foo');  // Читаем значение ключа 'foo'
      console.log(`Value: ${value}`);  // Логируем результат (должно вывести 'Value: bar')
    } catch (err) {
      console.error('Error performing set/get in Redis:', err);
    }

  })
  .catch(err => {
    console.error('Redis connection error:', err);
  });

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});
// Настройка сессий с Redis хранилищем
app.use(session({
  store: new RedisStore({ client: redisClient, logErrors: true }),
  name: "sid",
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Middleware для логирования сессии
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session.user);

  // Логирование сессии из Redis
  const sessionID = req.sessionID;
  redisClient.get(`sess:${sessionID}`, (err, data) => {
    if (err) {
      console.error('Error fetching session from Redis:', err);
    } else if (data) {
      console.log('Session in Redis:', JSON.parse(data)); // Парсим данные
    } else {
      console.log('Session not found in Redis');
    }
  });
  
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
