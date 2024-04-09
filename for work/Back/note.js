const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const passport = require("passport");
const expressSession = require('express-session');
const GoogleStrategy = require("passport-google-oauth20");
const router = require("./routes");
const { errorHandler } = require("./middlewares/error.handler.mw");


dotenv.config();
const app = express();



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/home',
  
},(accessToken, refreshToken, profile, callback)=>{
  callback(null, profile);
}
));
console.log('vladAAAAAAAAAAAAAAAAAA');

// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: '/facebook',
//   profileFields: ['email', 'displayName', 'name', 'picture']
// }, (accessToken, refreshToken, profile, callback)=>{
//   callback(null, profile);
// }
// ));

passport.serializeUser((user, callback)=>{
  callback(null, user);
});
passport.deserializeUser((user,callback)=>{
  callback(null, user)
});

app.use(expressSession({
    secret: 'jayantpatilapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/google', passport.authenticate('google', {scope:['profile email']}));
app.get('/home', passport.authenticate('google'), (req,res)=>{
  res.redirect('/');
});
app.get('/', (req,res)=>{
  res.send(req.user? req.user : 'not login');
});


app.use(cors())
app.use(express.static('public'))
app.use(express.json())
// app.use('/api', router)
// app.use(errorHandler)
module.exports = app;