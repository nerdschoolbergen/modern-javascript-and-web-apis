'use strict';
const express = require('express');
const tvShowService = require('./tvShowService');
const reviewService = require('../review/reviewService');
const tvShowRouter = express.Router();

// GET http://localhost:3000/tvshow/
tvShowRouter.get('/', (req, res) => {
  const tvShows = tvShowService.getAll().map(tvShow =>
    Object.assign(
      {},
      tvShow,
      {
        reviews: `http://localhost:3000/tvShow/${tvShow.id}/review`
      }
    )
  );
  res.send(tvShows);
});

// POST http://localhost:3000/tvshow/ Body: { "name": {name}, "genre": {genre} }
tvShowRouter.post('/', (req, res) => {
  const name = req.body.name;
  const genre = req.body.genre;
  const newTvShow = tvShowService.createTvShow(name, genre);
  res.send(newTvShow);
});

tvShowRouter.route('/:tvShowId')
  // GET http://localhost:3000/tvshow/:tvShowId/
  .get((req, res) => {
    const tvShowId = req.params.tvShowId;
    const tvShow = tvShowService.getById(tvShowId);
    res.send(Object.assign(
      {},
      tvShow,
      {
        reviews: `http://localhost:3000/tvShow/${tvShow.id}/review`
      }
    ));
  })
  // PUT // http://localhost:3000/tvshow/:tvShowId/ Body: { "name": {name} }
  .put((req, res) => {
    const tvShowId = req.params.tvShowId;
    const tvShowToUpdate = req.body;
    const updatedTvShow = tvShowService.update(tvShowId, tvShowToUpdate);
    res.send(updatedTvShow);
  })
  // DELETE http://localhost:3000/tvshow/:tvShowId/
  .delete((req, res) => {
    const tvShowId = req.params.tvShowId;
    const deletedTvShow = tvShowService.remove(tvShowId);
    res.send(deletedTvShow);
  });

tvShowRouter.route('/:tvShowId/review')
  .get((req, res) => {
    const relatedItemId = req.params.tvShowId;
    const tvShowReviews = reviewService.getAllForRelatedItem(relatedItemId);
    res.send(tvShowReviews);
  });

module.exports = tvShowRouter;
