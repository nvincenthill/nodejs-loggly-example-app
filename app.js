require('dotenv').config();

const express = require('express');
const winston = require('winston'),
  expressWinston = require('express-winston');

require('winston-loggly-bulk');

const { getRandomInt } = require('./helpers');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true
      }),
      new winston.transports.Loggly({
        subdomain: process.env.SUBDOMAIN,
        inputToken: process.env.CUSTOMER_TOKEN,
        json: true,
        tags: ['NodeJS']
      })
    ]
  })
);

app.get('/', (req, res) => {
  const responseType = getRandomInt(2, 6);

  switch (responseType) {
    case 2:
      res.send(200);
      break;
    case 3:
      res.send(301);
      break;
    case 4:
      res.send(400);
      break;
    case 5:
      res.send(500);
      break;
    default:
      throw 'This is a unhandled server error';
  }
});

// log errors to the console and Loggly
app.use(
  expressWinston.errorLogger({
    transports: [winstonConsoleTransport, logglyTransport],
    format: winston.format.json()
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
