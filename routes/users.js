const express = require('express');

const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
} = require('../controllers/users');

userRouter.use(express.json());

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.post('/', createUser);
userRouter.patch('/me', updateUserProfile);

module.exports = userRouter;
