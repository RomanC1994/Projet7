const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const TOKEN = process.env.TOKEN;

module.exports = (req, res, next) => {
   // Read the JWT access token from the request header
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
  console.log(token)
   if (token == null) return res.sendStatus(401); // Return 401 if no token
 
   // Verify the token using the Userfront public key
   jwt.verify(token, TOKEN, (err, auth) => {
     if (err) return res.sendStatus(403); // Return 403 if there is an error verifying
     req.auth = auth;
     next();
   });
};