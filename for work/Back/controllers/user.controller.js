const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const generateAccessToken = require("../middlewares/secretKeyRandom");



module.exports.userGoogle = async (req,res,next)=>{
  try {
    const user = req.user;
    console.log(user);
    if(!user){
      const error = createError(400,'Something Is Wrong Try Again');
      next(error);
    }
    const token = generateAccessToken(user.id);
    user.token = token;
   
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

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.userLogin = async (req,res,next)=>{
  try {
    const {body} = req;
    console.log(body)
    const user = await User.findOne({where:{email: body.email}});
    if(!user){
      const error = createError(400,'Please enter a valid email');
      next(error);
    }
    const validPassword = bcrypt.compareSync(body.password,user.password);
    if(!validPassword){
      const error = createError(404,'Password is not valid')
      next(error);
    }
   
    res.status(201).send({data:user})
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

module.exports.userLogout = async (req,res,next)=>{
  try {
      req.session.destroy();
      res.status(201).send({message: 'ok!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'})
  } catch (error) {
    next(error)
  }
  
};



