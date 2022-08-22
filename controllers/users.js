const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res.status(400).send({ message: 'Ошибка валидации. Переданные данные не корректны' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации. Переданные данные не корректны' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации. Переданные данные не корректны' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send({ user });
    })
    .catch((e) => {
      if (e.name === 'CastError' || e.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка валидации. Переданные данные не корректны' });
      }
      return res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
