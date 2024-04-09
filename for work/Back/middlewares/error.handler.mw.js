


module.exports.errorHandler = async (err,req,res,next)=>{
  const status = err.status || 500;
  res.status(status).send({error:[{message: err.message || 'ServerError'}]})
};