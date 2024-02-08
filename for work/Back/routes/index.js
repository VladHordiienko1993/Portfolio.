const {Router} = require("express");
const taskRouter = require("./TaskRouter");
const userRouter = require("./UserRouter");



const  router = Router();

router.use('/users',userRouter)
router.use('/tasks',taskRouter)

module.exports = router;