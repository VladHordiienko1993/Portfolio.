const jwt = require('jsonwebtoken');



const secretKey = {
  secret: "SECRET_KEY_RANDOM"
};

module.exports = generateAccessToken = (id)=>{
  const payload = { id };
  return jwt.sign(payload, secretKey.secret, {expiresIn: "24h"});
};


