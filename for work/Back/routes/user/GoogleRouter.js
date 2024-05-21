const passport = require("passport");
const {Router} = require('express');
const UserController = require('../../controllers/user.controller');

const googleRouter = Router();



googleRouter.get('/auth', passport.authenticate('google', {scope:['profile', 'email']}))
googleRouter.get('/auth/callBack', passport.authenticate('google',{
  successRedirect: 'http://localhost:3001/',
  failureRedirect: 'http://localhost:3001/signUpPage'}));
  
  googleRouter.get('/auth/callBack/success', UserController.userGoogle);

module.exports = googleRouter;