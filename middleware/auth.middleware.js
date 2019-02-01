'use strict';

const dotenv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');

// setup the environment variable
const result = dotenv.config({ path: path.join(__dirname, '../env/.env') });

if (result.error) {
    throw result.error
}

function getTokenFromHeaders(headers) {
    const authorization = headers.authorization;
  
    if(authorization && authorization.split(' ')[0] === 'Bearer') {
      return authorization.split(' ')[1];
    }
    return null;
}

function verifyToken(req, res, next) {
  var token = getTokenFromHeaders(req.headers);
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_secret, (err, decoded) => {
    if (err)
        return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

    req.jwt = decoded;
    next();
  });
}

module.exports = verifyToken;