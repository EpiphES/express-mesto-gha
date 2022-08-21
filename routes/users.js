const express = require('express');

const userRouter = express.Router();
const { getUsers, createUser } = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.post('/', express.json(), createUser);

module.exports = userRouter;
