const User = require('../models/user');

let ERROR_CODE = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        ERROR_CODE = 404;
        return res
          .status(ERROR_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        ERROR_CODE = 400;
        return res
          .status(ERROR_CODE)
          .send({ message: 'Ошибка валидации. Переданные данные не корректны' });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        ERROR_CODE = 400;
        return res
          .status(ERROR_CODE)
          .send({
            message: 'Ошибка валидации. Переданные данные не корректны',
          });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        ERROR_CODE = 404;
        return res
          .status(ERROR_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        ERROR_CODE = 400;
        return res
          .status(ERROR_CODE)
          .send({
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
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        ERROR_CODE = 404;
        return res
          .status(ERROR_CODE)
          .send({ message: 'Пользователь не найден' });
      }
      return res.send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        ERROR_CODE = 400;
        return res
          .status(ERROR_CODE)
          .send({
            message: 'Ошибка валидации. Переданные данные не корректны',
          });
      }
      return res
        .status(ERROR_CODE)
        .send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
