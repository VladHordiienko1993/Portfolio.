module.exports.errorHandler = async (req,res,next)=>{
  const status = err.status || 500;
  res.status(status).send({error:[{message: err.message || 'ServerError'}]})
};