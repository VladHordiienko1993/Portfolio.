const passport = require("passport");
const {Router} = require('express');
const UserController = require('../../controllers/user.controller');
const generateAccessToken = require("../../middlewares/secretKeyRandom");

const googleRouter = Router();



googleRouter.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

googleRouter.get('/auth/callBack', 
  passport.authenticate('google', {
    failureRedirect: 'https://hordiienko1.netlify.app/signUpPage'
  }),
  (req, res) => {
    const { id } = req.user.dataValues;
    console.log(`id User ${id}`)
    const token = generateAccessToken(id);

    res.cookie('jwt',token,{
      httpOnly: true,
        secure: true,  
        sameSite: 'None', 
        maxAge: 24 * 60 * 60 * 1000 
     })
//googleSuccess
    res.redirect('https://hordiienko1.netlify.app/');
  }
);

googleRouter.get('/auth/callBack/success', UserController.userGoogle);

module.exports = googleRouter;