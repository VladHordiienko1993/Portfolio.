const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require('express-session');
const dotenv = require('dotenv');
const router = require("./routes");
const  {errorHandler}  = require("./middlewares/error.handler.mw");
const passportGoogle = require('./passports/passportGoogle');



const app = express();
dotenv.config();
app.use(cors({origin:'http://localhost:3001',methods:'GET,POST,PUT,DELETE',credentials:true}))
// app.use((req,res)=>{
//   res.header('Referrer_Policy','no-referrer-when-downgrade');
// })

app.use(session ({
  secret: process.env.COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000 } 
}))

app.use(passport.initialize());
app.use(passport.session());



app.use(express.static('public'));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);
module.exports = app;