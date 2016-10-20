'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const tvShowRouter =  require('./tvShow/tvShow.router');

const app = express();
const APP_PORT = 3000;

// Exercise #1
app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

// Exercise #2
app.use(bodyParser.json());
app.use('/tvshow', tvShowRouter);

app.listen(APP_PORT, () => {
  console.log(`App running on port ${APP_PORT}`);
});
