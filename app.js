const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');

const NOT_FOUND_CODE = 404;

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6301c9573647ac6a7daeed89',
  };

  next();
});
app.use(express.json());
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', router);
app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страница не найдена' });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
}

main();
