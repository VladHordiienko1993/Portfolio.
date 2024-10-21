const passport = require("passport");
const {Router} = require('express');
const UserController = require('../../controllers/user.controller');

const googleRouter = Router();



googleRouter.get('/auth', passport.authenticate('google', {scope:['profile', 'email']}))
googleRouter.get('/auth/callBack', passport.authenticate('google',{
  successRedirect: process.env.SUCCESS_REDIRECT_URL || 'https://hordiienko1.netlify.app/googleSuccess',
  failureRedirect: process.env.FAIL_URE_REDIRECT || 'https://hordiienko1.netlify.app/signUpPage'}));
  
  googleRouter.get('/auth/callBack/success', UserController.userGoogle);

module.exports = googleRouter;