const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const dotenv = require('dotenv');
const { User } = require("../models");


dotenv.config();


passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id,done)=>{
  User.findOne({where:{id}}).then((user)=>{
    const userWithoutSensitiveData = {
      id: user.id,
      googleId: user.googleId,
      facebookId: user.facebookId,
      token: user.token,
      email: user.email,
      name: user.name,
      imgPath: user.imgPath
  };
     done(null, userWithoutSensitiveData)
  })
 
});



passport.use(new OAuth2Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://portfolio-4jfj.onrender.com/api/google/auth/callBack',
  scope: ['profile','email']
  
},(accessToken, refreshToken, profile, done)=>{
  
  User.findOne({where:{googleId:profile.id}}).then((currentUser)=>{
    if(currentUser){
      done(null,currentUser)
    }else{
       new User({
        googleId: profile.id,
        name: profile.displayName,
        email:  profile.emails[0].value,
        password: 'hash',
        imgPath: profile.photos[0].value
  }).save().then((newUser)=> {
    done(null,newUser)})
    }
  })
}
)); 
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: '/facebook',
//   profileFields: ['email', 'displayName', 'name', 'picture']
// }, (accessToken, refreshToken, profile, callback)=>{
//   callback(null, profile);
// }
// ));