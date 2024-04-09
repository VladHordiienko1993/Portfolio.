const {Router} = require("express");
const taskRouter = require("./TaskRouter");
const userRouter = require("./UserRouter");
const googleRouter = require("./GoogleRouter");




const  router = Router();
router.use('/google',googleRouter)
router.use('/users',userRouter)
router.use('/tasks',taskRouter)


module.exports = router;