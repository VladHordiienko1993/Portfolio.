const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const router = require("./routes");
const { errorHandler } = require("./middlewares/error.handler.mw");
const passportGoogle = require('./passports/passportGoogle');

const app = express();
//http://localhost:3001
//https://hordiienko1.netlify.app
const corsOptions = {
  origin: 'https://hordiienko1.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true
};


app.use(cors(corsOptions))
app.use(passport.initialize());
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorHandler);

module.exports = app;
