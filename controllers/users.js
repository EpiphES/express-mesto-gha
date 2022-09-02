const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ERROR_CODE = 500; const ERROR_DATA_CODE = 400;
const NOT_FOUND_CODE = 404;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res.status(ERROR_DATA_CODE).send({
          message: 'Ошибка валидации. Переданные данные не корректны',
        });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => res.send({ user }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(ERROR_DATA_CODE).send({
          message: 'Ошибка валидации. Переданные данные не корректны',
        });
      }
      return res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        return res.status(ERROR_DATA_CODE).send({
          message: 'Ошибка валидации. Переданные данные не корректны',
        });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        return res.status(ERROR_DATA_CODE).send({
          message: 'Ошибка валидации. Переданные данные не корректны',
        });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'SECRET', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
  login,
};
