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
    // Аутентификация успешна, создаем JWT и отправляем его в cookie или локальное хранилище
    // const {user} = req.user;
    // console.log( `user1 ${user}`);
    //     console.log(`user into token ${req.user}`)
    // console.log( `user ${user}`)

    const { id } = req.user.dataValues;
    console.log(`id User ${id}`)
    const token = generateAccessToken(id);

    res.cookie('jwt',token,{
      httpOnly: true,
        secure: true,  
        sameSite: 'None', 
        maxAge: 24 * 60 * 60 * 1000 
     })

    res.redirect('https://hordiienko1.netlify.app/googleSuccess');
  }
);

// Обработка успешного входа
googleRouter.get('/auth/callBack/success', UserController.userGoogle);

module.exports = googleRouter;