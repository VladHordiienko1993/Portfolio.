const {Router} = require("express");
const UserController = require('../../controllers/user.controller');


const logout = Router();

logout.get('/', UserController.userLogout);


module.exports = logout;