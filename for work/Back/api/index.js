const http = require("http");

const dotenv = require('dotenv');

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require('express-session');

const router = require("../routes");
const  {errorHandler}  = require("../middlewares/error.handler.mw");
const passportGoogle = require('../passports/passportGoogle');





dotenv.config();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


server.listen(PORT,()=>{console.log(`server started at PORT: ${PORT}`)});






const app = express();
dotenv.config();
app.use(cors({origin:'http://localhost:3001',methods:'GET,POST,PUT,DELETE,PATCH',credentials:true}))


app.use(session ({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 } 
}));

app.use(passport.initialize());
app.use(passport.session());



app.use(express.static('public'));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
module.exports = app;