const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');
const { authorizationErrorMessage } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    return next(new AuthorizationError(authorizationErrorMessage));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
