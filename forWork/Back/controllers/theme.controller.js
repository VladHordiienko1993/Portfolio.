const { ThemeSwitch } = require("../models");





module.exports.addTheme = async (req, res, next) => {
    try {
      const { body} = req;
      console.log(body)
    const newTheme = await ThemeSwitch.create(body);
    res.status(201).send({ data: newTheme });
    } catch (error) {
      next(error);
    }
};

module.exports.getTheme = async (req,res,next)=>{
  try {
    const getTheme = await ThemeSwitch.findOne({where:{id: 1}})
  

    res.status(200).send({data:getTheme.theme})

  } catch (error) {
    next(error)
  }
};


module.exports.updateTheme = async (req,res,next)=>{
  try {
    const {body} = req;
    
    const foundTheme = await ThemeSwitch.findOne({where: {id:1}});
 

    if (!foundTheme) {
      return res.status(404).send({ message: "Theme not found" });
    }
  
    const updatedTheme = await foundTheme.update({theme:body.theme})
   
    
    res.status(200).send({data:updatedTheme.theme})
  } catch (error) {
      next(error)
  }
};