const express = require('express');

const cardRouter = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidation,
  deleteCardValidation,
  cardLikeValidation,
  dislikeCardValidation,
} = require('../middlewares/validation');

cardRouter.use(express.json());

cardRouter.get('/', getCards);

cardRouter.post('/', createCardValidation, createCard);

cardRouter.delete('/:cardId', deleteCardValidation, deleteCard);

cardRouter.put('/:cardId/likes', cardLikeValidation, likeCard);

cardRouter.delete('/:cardId/likes', dislikeCardValidation, dislikeCard);

module.exports = cardRouter;
