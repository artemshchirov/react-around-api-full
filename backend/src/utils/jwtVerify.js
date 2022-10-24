const jwt = require('jsonwebtoken');

const { NODE_ENV, REACT_APP_JWT_SECRET } = process.env;

exports.jwtVerify = (jwt) => {
  try {
    return jwt.verify(
      jwt,
      NODE_ENV === 'production' ? REACT_APP_JWT_SECRET : 'dev-secret'
    );
  } catch (err) {
    return false;
  }
};
