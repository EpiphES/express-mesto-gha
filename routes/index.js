const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');

const NOT_FOUND_CODE = 404;

router.use(express.json());
router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страница не найдена' });
});

module.exports = router;
