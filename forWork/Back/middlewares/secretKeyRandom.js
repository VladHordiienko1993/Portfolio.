const jwt = require('jsonwebtoken');



const secretKey = process.env.JWT_SECRET || "SECRET_KEY_RANDOM";



const generateAccessToken = (id) => {
  const payload = { id };  
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });  
};

module.exports = generateAccessToken;
