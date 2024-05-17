const {Router} = require("express");
const ThemeController = require("../controllers/theme.controller");


const themeRouter = Router();

themeRouter.post('/', ThemeController.addTheme);
themeRouter.patch('/updateTheme', ThemeController.updateTheme);
themeRouter.get('/getTheme', ThemeController.getTheme);






module.exports = themeRouter;