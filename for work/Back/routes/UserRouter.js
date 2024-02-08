const {Router} = require("express");
const UserController = require("../controllers/user.controller");
const uploadImageMw = require("../middlewares/uploadImage.mw");
const { checkUser } = require("../middlewares/user.mw");

const userRouter = Router();

userRouter.post('/', uploadImageMw ,UserController.createUserInstance)
userRouter.get('/', UserController.getAllUsers)
userRouter.delete('/:userId', checkUser, UserController.deleteUserInstance)
userRouter.patch('/:userId', checkUser, UserController.updateUserInstance)
userRouter.get('/:userId', checkUser, UserController.getUserInstance)
userRouter.post('/:userId/image', checkUser, uploadImageMw, UserController.createImageforUser);



module.exports = userRouter;