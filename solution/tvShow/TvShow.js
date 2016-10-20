'use strict';

const createId = require('../utils/id.util');
class TvShow {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
    this.id = createId();
  }
};

module.exports = TvShow;
