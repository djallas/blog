// manage auth
const dotenv = require('dotenv');
// Update with your config settings.
dotenv.config();

import jwt from 'jsonwebtoken';

let verifyAuth = (req, res, next) =>{ 
  // const bearerHeader = req.headers["authorization"];
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  
  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    // verify token
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(409).send({
          success: false,
          message: 'Token is not valid'
        });
      }else{
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }

}

export default verifyAuth