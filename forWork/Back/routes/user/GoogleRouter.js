const passport = require("passport");
const {Router} = require('express');
const UserController = require('../../controllers/user.controller');


const googleRouter = Router();



googleRouter.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

googleRouter.get('/auth/callBack', 
  passport.authenticate('google', {failureRedirect: 'https://hordiienko1.netlify.app/signUpPage'}),UserController.userGoogle);


module.exports = googleRouter;