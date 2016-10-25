'use strict';
const express = require('express');
const reviewService = require('./reviewService');
const Review = require('./Review');
const reviewRouter = express.Router();


reviewRouter.route('/')
// GET http://localhost:3000/review/
  .get((req, res) => {
    const reviews = reviewService.getAll();
    res.send(reviews);
  })
  // POST http://localhost:3000/review/
  .post((req, res) => {
    const content = req.body.content;
    const score = req.body.score;
    const relatedItemId = req.body.relatedItemId;

    const newReview = reviewService.createReview(content, score, relatedItemId);
    res.send(newReview);
  });

reviewRouter.route('/:reviewId')
  // GET http://localhost:3000/review/:reviewId/
  .get((req, res) => {
    const reviewId = req.params.reviewId;
    const review = reviewService.getById(reviewId);
    res.send(review);
  })

  // PUT // http://localhost:3000/review/:reviewId/
  .put((req, res) => {
    const reviewId = req.params.reviewId;
    const reviewToUpdate = req.body;
    const updatedReview = reviewService.update(reviewId, reviewToUpdate);
    res.send(updatedReview);
  })

  // DELETE http://localhost:3000/review/:reviewId/
  .delete((req, res) => {
    const reviewId = req.params.reviewId;
    reviewService.remove(reviewId);
    const remaingingReviews = reviewService.getAll();
    res.send(remaingingReviews);
  });

module.exports = reviewRouter;
