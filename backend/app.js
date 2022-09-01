require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { routes } = require('./src/routes/index');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const { INTERNAL_SERVER_ERROR } = require('./src/utils/constants');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path} ${JSON.stringify(req.body)}`);
  next();
});

app.use(requestLogger);

app.use(cors());

app.use(routes);

function main() {
  const url = 'mongodb://localhost:27017/mestodb';
  try {
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        autoIndex: true,
      },
      (err) => {
        if (err) throw err;
        console.log('Connected to db');
      }
    );
  } catch (err) {
    throw new Error(err.message);
  }

  app.use(errorLogger);

  app.use(errors());

  app.use((err, req, res, next) => {
    const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
    res.status(statusCode).send({
      message:
        statusCode === INTERNAL_SERVER_ERROR
          ? '500 Internal Server Error'
          : message,
    });
  });

  app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
