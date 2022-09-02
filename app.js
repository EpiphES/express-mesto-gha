const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '6301c9573647ac6a7daeed89',
  };

  next();
});
app.use(express.json());
app.use('/', router);

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
