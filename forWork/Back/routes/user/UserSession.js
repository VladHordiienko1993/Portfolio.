const {Router} = require("express");
const UserController = require('../../controllers/user.controller');


const userSessionRouter = Router();

userSessionRouter.get('/', UserController.userSession);


module.exports = userSessionRouter;