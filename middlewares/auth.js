const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    return next(new UnauthorizedError('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
