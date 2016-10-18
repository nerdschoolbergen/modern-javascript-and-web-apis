'use strict';
const express = require('express');
const tvShowRouter = express.Router();
const postTvShow = require('../services/tvShow.service')

// Exsercise #2
tvShowRouter.get('/', (req, res) => {
  res.send('List all shows')
});

tvShowRouter.get('/:tvShowId', (req, res) => {
  res.send(`List all shows with id ${req.params.tvShowId}`);
});

tvShowRouter.post('/:tvShowId', (req, res) => {
  res.send('Return posted tv show');
});

tvShowRouter.put('/:tvShowId', (req, res) => {
  res.send('Return updated posted tv show');
});

tvShowRouter.delete('/:tvShowId', (req, res) => {
  res.send('Return deleted tv show');
});

module.exports = tvShowRouter;
