
// The code below is a middleware function that verifies the token sent in the request header.
// If there is no token in the request header, the middleware returns a 401 response with 
// a message saying "No token, authorization denied".
// If there is a token in the request header, the middleware tries to verify the token using jwt.verify.
// If the token is not valid, the middleware returns a 401 response with a message saying "Token is not valid".
// If the token is valid, the middleware extracts the user from the token and sets it in the request object.

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  console.log('Token received in middleware:', token); // Debug log

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
