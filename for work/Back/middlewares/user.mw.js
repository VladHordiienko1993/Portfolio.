const createError = require("http-errors");
const {User} = require("../models");



module.exports.checkUser =async(req, res, next)=>{
  try {
    const {params:{userId}} = req;
    const userInstance = await User.findByPk(userId, {attributes: {exclude:["password"]}});
    if(!userInstance){
      const error = createError(404,'User not found!');
      next(error);
    }
    req.userInstance = userInstance;
    next();
  } catch (error) {
    next(error)
  }
};