  
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Customer = require('../Models/Customer');

// json web token is verified
const Auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    try {
      token = req.headers.authorization.split(' ')[1].toString();
      const decodedToken = jwt.verify(token, "customersecretkey");
      req.customer = await Customer.findById(decodedToken.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('not authorized, no token');
    }
  if (!token) {
    res.status(401);
    throw new Error('not authorized, no token');
  }
});

module.exports = Auth;