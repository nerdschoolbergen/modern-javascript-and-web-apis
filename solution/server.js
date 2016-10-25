'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const tvShowRouter = require('./tvShow/tvShowRouter');
const reviewRouter = require('./review/reviewRouter');

const app = express();
const APP_PORT = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

// Exercise #1
app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

// Exercise #2
app.use('/tvshow', tvShowRouter);
// Exercise #3
app.use('/review', reviewRouter);

app.listen(APP_PORT, () => {
  console.log(`App running on port ${APP_PORT}`);
});
