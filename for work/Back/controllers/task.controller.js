const {Task} = require("../models");

module.exports.createTaskInstance = async (req,res,next)=>{
  try {
    const {body, userInstance} = req;
    const createdTask = await userInstance.createTask (body)
    res.status(201).send({data:createdTask})
  } catch (error) {
    next(error)
  }
}

module.exports.deleteTaskInstance = async (req,res,next)=>{
  try {
      const {params: {taskId,userId}} = req;
    const deletedTask = await Task.destroy({where:{id:taskId,userId}})
    res.status(201).send({data:deletedTask})
  } catch (error) {
    next(error);
  }
  };


module.exports.getUserTasks = async (req,res,next)=>{
  try {
    const  {userInstance} = req;
    const allTasks = await userInstance.getTasks();
    res.status(201).send({data:allTasks})
  } catch (error) {
    next();
  }
};
 
module.exports.deleteTasks = async(req,res,next)=>{
  try {
    const {params:{userId}} = req;
   const deletedTasks =  await Task.destroy({where:{userId}});
     res.status(201).send({data:deletedTasks})
   
} catch (error) {
  next(error);
}
};

module.exports.updateTask = async (req,res,next)=>{
  try {
    const {body, params:{userId, taskId}} = req;
    const updatedTask = await Task.update(body, {where: { id: taskId,userId: userId}})
    res.status(201).send({data:updatedTask})
  } catch (error) {
    next(error)
  }
};