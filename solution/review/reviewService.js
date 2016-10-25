'use strict';
const Review = require('./Review');
const createId = require('../utils/idUtil');

class ReviewService {
  constructor() {
    this.reviews = [
    ];
  }

  getAll() {
    return this.reviews;
  }

  getAllForRelatedItem(relatedItemId) {
    return this.reviews.filter(review => review.relatedItemId === relatedItemId);
  }

  getById(id) {
    return this.reviews.find(review => review.id == id);
  }

  createReview(content, score, relatedItemId) {
    const id = createId();
    const review = new Review(id, content, score, relatedItemId);
    this.reviews.push(review);
    return review;
  }

  remove(id) {
    this.reviews = this.reviews.filter(review => review.id !== id);
  }

  update(id, updatedReview) {
    this.reviews = this.reviews
      .map(review => {
        if (review.id === id) {
          return Object.assign({}, review, updatedReview);
        }
        return review;
      });
    return this.getById(id);
  }
}

module.exports = new ReviewService();
