require('dotenv').config();

const express = require('express');
const winston = require('winston'),
  expressWinston = require('express-winston');

require('winston-loggly-bulk');

const app = express();
const port = process.env.PORT || 3000;

const winstonConsoleTransport = new winston.transports.Console({
  json: true,
  colorize: true
});

const logglyTransport = new winston.transports.Loggly({
  subdomain: process.env.SUBDOMAIN,
  inputToken: process.env.CUSTOMER_TOKEN,
  tags: ['Winston-NodeJS'],
  json: true
});

// Place the express-winston logger before the router.
app.use(
  expressWinston.logger({
    transports: [logglyTransport]
  })
);

app.get('/', (req, res) => {
  throw 'This is an example error';
  res.send('Hello World!');
});

app.use(
  expressWinston.errorLogger({
    transports: [winstonConsoleTransport, logglyTransport],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
