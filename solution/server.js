'use strict';

const express = require('express');

const app = express();
const APP_PORT = 3000;

// Exercise #1
app.get('/hello', (req, res) => {
  res.send('Hello World!')
});

app.listen(APP_PORT);
