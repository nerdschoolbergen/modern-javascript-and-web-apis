'use strict';
const express = require('express');
const tvShowRouter = express.Router();
const tvShowService = require('./tvShow.service');
const TvShow = require('./TvShow');

// Exsercise #2
tvShowRouter.get('/', (req, res) => {
  res.json(tvShowService.getAllTvShows());
});

tvShowRouter.route('/:tvShowId')
  .get((req, res) => {
    res.send(`List all shows with id ${req.params.tvShowId}`);
  })
  .post((req, res) => {
    //TODO: validation
    const postedTvShow = tvShowService.postTvShow(
      new TvShow(req.body.name, req.body.genre)
    );
    console.log('Posted show', postedTvShow);
    res.send('Return posted tv show');
  })
  .put((req, res) => {
    res.send('Return updated posted tv show');
  })
  .delete((req, res) => {
    res.send('Return deleted tv show');
  });

module.exports = tvShowRouter;
