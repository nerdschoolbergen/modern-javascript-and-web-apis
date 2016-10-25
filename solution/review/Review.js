'use strict';
class Review {
  constructor(id, content, score, relatedItemId) {
    this.id = id;
    this.content = content;
    this.score = score;
    this.relatedItemId = relatedItemId;
  }
};

module.exports = Review;
