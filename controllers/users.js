const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.sendStatus(500).send({ message: 'Произошла ошибка' }));
};

// const getUserById = (req, res) => {
//   const { id } = req.params;

// }

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.sendStatus(500).send({ message: 'Произошла ошибка' }));
};

module.exports = { getUsers, createUser };
