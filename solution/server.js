'use strict';

const express = require('express');
const tvShowRouter =  require('./routers/tvShowRouter');
const app = express();
const APP_PORT = 3000;

// Exercise #1
app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

app.use('/tvshow', tvShowRouter);

app.listen(APP_PORT, () => {
  console.log(`App running on port ${APP_PORT}`);
});
