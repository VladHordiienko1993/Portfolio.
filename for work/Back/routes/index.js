const {Router} = require("express");
const taskRouter = require("./task/TaskRouter");
const userRouter = require("./user/UserRouter");
const googleRouter = require("./user/GoogleRouter");
const logoutRouter = require('./user/Logout');
const themeRouter = require("./theme/SwithTheme");
const userSessionRouter = require("./user/UserSession");
const chatRouter = require("./chat/ChatRouter");

const  router = Router();
router.use('/google',googleRouter);
router.use('/users',userRouter);
router.use('/tasks',taskRouter);
router.use('/logout',logoutRouter);
router.use('/theme', themeRouter);
router.use('/session', userSessionRouter);
router.use('/chat', chatRouter);

module.exports = router;