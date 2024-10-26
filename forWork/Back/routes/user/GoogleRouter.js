const passport = require("passport");
const {Router} = require('express');
const UserController = require('../../controllers/user.controller');

const googleRouter = Router();



googleRouter.get('/auth', passport.authenticate('google', { scope: ['profile', 'email'] }));

googleRouter.get('/auth/callBack', 
  passport.authenticate('google', {
    failureRedirect: 'https://hordiienko1.netlify.app/signUpPage'
  }),
  (req, res) => {
    // Аутентификация успешна, создаем JWT и отправляем его в cookie или локальное хранилище
        console.log(`user into token ${req.user}`)
    const token = generateAccessToken(req.user); // Генерация JWT на основе пользователя

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