const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const generateAccessToken = require("../middlewares/secretKeyRandom");
const { User } = require("../models");

module.exports.checkSession = async (req, res) => {

  const token = req.cookies.jwt;
  console.log(`${token} он есть `)
  console.log(req.cookies);

  if (!token) {
    return res.status(401).send({ message: 'Not authenticated' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "SECRET_KEY_RANDOM");
    console.log('Декодированный токен:', decoded);
    

    const user = await User.findOne({ where: { id: decoded.id } });
    console.log('Найденный пользователь:', user);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }


    res.status(200).send({data: user});
  } catch (error) {
    console.error('Ошибка при проверке токена или поиске пользователя:', error);
    return res.status(401).send({ message: 'Invalid token' });
  }
};



module.exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

 
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: 'Please enter a valid email' });
    }


    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: 'Password is not valid' });
    }


    const token = generateAccessToken(user.id);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,  // Использовать только по HTTPS (в продакшене) process.env.NODE_ENV === 'production'
      sameSite: 'None', // 'lax' тоже для локал 
      maxAge: 24 * 60 * 60 * 1000  // 1 день
    });

    // Отправляем основные данные пользователя клиенту
    res.status(201).send({data: user});

  } catch (error) {
    next(error);
  }
};




module.exports.userGoogle = async (req,res,next)=>{
  try {
    const user = req.user;
    
    if(!user){
      const error = createError(400,'Something Is Wrong Try Again');
      next(error);
    }
    const token = generateAccessToken(user.id);
    user.token = token;
    req.session.user = user;

    res.send({data:user}); 
  } catch (error) {
    next(error)
  }
};


module.exports.userRegistration = async (req, res, next) => {
  try {
    const { body, file} = req;
    const candidate = await User.findOne({where:{email: body.email}});
    if(candidate){
      return res.status(400).send({message: 'User with this email already exists'})
    }
    if (file) {
      body.imgPath = file.filename;
    }
    hashPassword = bcrypt.hashSync(body.password, 5);
     body.password = hashPassword;
    const user = await User.create(body);
    if (!user) {
      return res.status(400).send({message: "Try again"})
    }
    
    const token = generateAccessToken(user.id);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,  // Использовать только по HTTPS (в продакшене) process.env.NODE_ENV === 'production'
      sameSite: 'None', // 'lax' тоже для локал 
      maxAge: 24 * 60 * 60 * 1000  // 1 день
    });
    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};





module.exports.userLogout = async (req, res, next) => {
  try {
    res.clearCookie('jwt', {
      secure: true, 
      httpOnly: true, 
      sameSite: 'None'
    });
    console.log('JWT after clearing cookie:', req.cookies.jwt);

    res.status(200).send({ message: 'User logged out successfully' });
  } catch (error) {
    next(error); 
  }
};



module.exports.deleteUserInstance = async (req, res, next) => {
  try {
    const { userInstance } = req;
    const result = await userInstance.destroy({ returning: true });
    res.status(200).send({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserInstance = async (req, res, next) => {
  try {
    const { body, userInstance } = req;

    const updatedUser = await userInstance.update(body, { returning: true });
    res.status(200).send({ date: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserInstance = async (req, res, next) => {
  try {
    const { userInstance } = req;
    res.status(200).send({ data: userInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.createImageforUser = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { userId },
    } = req;
    const [row, [user]] = await User.update(
      { imgPath: filename },
      { where: { id: userId }, returning: true }
    );
    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};




