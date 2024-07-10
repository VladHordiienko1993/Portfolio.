const {Router} = require("express");
const TaskController = require("../../controllers/task.controller");
const { checkUser } = require("../../middlewares/user.mw");



const taskRouter = Router();

taskRouter.post('/users/:userId', checkUser, TaskController.createTaskInstance);
taskRouter.delete('/:taskId/users/:userId', checkUser, TaskController.deleteTaskInstance);
taskRouter.patch('/:taskId/users/:userId', checkUser, TaskController.updateTask);
taskRouter.get('/:userId', checkUser, TaskController.getUserTasks);
taskRouter.delete('/:userId', checkUser, TaskController.deleteTasks);


module.exports = taskRouter;