const {Router} = require("express");
const UserController = require('../../controllers/user.controller');


const logout = Router();

logout.post('/', UserController.userLogout);


module.exports = logout;