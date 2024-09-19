const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const generateAccessToken = require("../middlewares/secretKeyRandom");
const redis = require('redis');




module.exports.userSession = async (req,res,next)=>{
  try {
   
    const {user} = req.session;
    if (!user) {
      return res.status(401).send({error: 'User Not authenticated'})
    }
    
    res.status(201).send({data:user});
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
      const error = createError(400,'User with this email already exists');
      next(error);
    }
    if (file) {
      body.imgPath = file.filename;
    }
    hashPassword = bcrypt.hashSync(body.password, 5);
     body.password = hashPassword;
    const user = await User.create(body);
    if (!user) {
      const error = createError(400, "Try again");
      next(error); 
    }
    req.session.user = user;
    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};


module.exports.userLogin = async (req, res, next) => {
  try {
    const { body } = req;
    
    // Поиск пользователя по email
    const user = await User.findOne({ where: { email: body.email } });
    if (!user) {
      const error = createError(400, 'Please enter a valid email');
      return next(error);
    }

    // Проверка пароля
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (!validPassword) {
      const error = createError(404, 'Password is not valid');
      return next(error);
    }

    // Сохранение информации о пользователе в сессии
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    // Сохранение сессии
    req.session.save(async (err) => {
      if (err) {
        console.error('Error saving session:', err);
        return next(err);
      }
      console.log('Session saved successfully');
      
      // Создаем клиента Redis
      const redisClient = redis.createClient({ url: process.env.REDIS_URL });
      await redisClient.connect(); // Подключаемся к Redis
      
      // Используем ID текущей сессии
      const sessionID = req.sessionID;

      // Проверяем, записана ли сессия в Redis
      redisClient.get(`sess:${sessionID}`, (err, data) => {
        if (err) {
          console.error('Error fetching session from Redis:', err);
        } else if (data) {
          console.log('Session in Redis:', data); // Логируем данные сессии из Redis
        } else {
          console.log('Session not found in Redis');
        }
      });

      // Закрываем соединение с Redis после использования
      redisClient.quit();

    });

    // Логирование сохранённой сессии в консоль
    console.log('Saved userSession:', req.session.user);

    // Отправка ответа с данными пользователя и сессией
    res.status(201).send({
      data: user,
      userSession: req.session.user
    });

  } catch (error) {
    next(error);
  }
};


module.exports.userLogout = async (req,res,next)=>{
  try {
    req.session.destroy(err => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.status(200).send({ message: 'Session has been destroyed' });
    });
     
  } catch (error) {
    next(error)
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




