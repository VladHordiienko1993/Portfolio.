const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const session = require('express-session');
const router = require("./routes");
const { errorHandler } = require("./middlewares/error.handler.mw");
const passportGoogle = require('./passports/passportGoogle');

const app = express();


const corsOptions = {
  origin: process.env.FRONT_REMOTE_URL || 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
};

app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure:  true, //process.env.NODE_ENV === 'production',  // Set secure in production
    maxAge: 24 * 60 * 60 * 1000  // 1 day
  }
}));


app.use(cors(corsOptions))
app.use(passport.session());
app.use(passport.initialize());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorHandler);



// Этот маршрут должен быть последним
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'path_to_your_frontend_build/index.html'));
});


module.exports = app;
