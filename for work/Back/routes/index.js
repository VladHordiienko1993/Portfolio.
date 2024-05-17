const {Router} = require("express");
const taskRouter = require("./TaskRouter");
const userRouter = require("./UserRouter");
const googleRouter = require("./GoogleRouter");
const logoutRouter = require('./Logout');
const themeRouter = require("./SwithTheme");



const  router = Router();
router.use('/google',googleRouter)
router.use('/users',userRouter)
router.use('/tasks',taskRouter)
router.use('/logout',logoutRouter)
router.use("/theme", themeRouter)


module.exports = router;