'use strict';
const TvShow = require('./TvShow');
const createId = require('../utils/idUtil');

class TvShowService {
  constructor() {
    this.tvShows = [
      new TvShow(createId(), 'Mr.Robot', 'Drama'),
      new TvShow(createId(), 'Black Mirror', 'Drama')
    ];
  }

  getAll() {
    return this.tvShows.map(tvShow =>
      Object.assign(
        {},
        tvShow,
        {
          reviews: `http://localhost:3000/tvShow/${tvShow.id}/review`
        }
      )
    );
  }

  getById(id) {
    const tvShow = this.tvShows.find(tvShow => tvShow.id == id)
    return Object.assign(
      {},
      tvShow,
      {
        reviews: `http://localhost:3000/tvShow/${tvShow.id}/review`
      }
    );
  }

  createTvShow(name, genre) {
    const id = createId();
    const tvShow = new TvShow(id, name, genre);
    this.tvShows.push(tvShow);
    return tvShow;
  }

  remove(id) {
    this.tvShows = this.tvShows.filter(tvShow => tvShow.id !== id);
  }

  update(id, updatedTvShow) {
    this.tvShows = this.tvShows
      .map(tvShow => {
        if (tvShow.id === id) {
          return Object.assign({}, tvShow, updatedTvShow);
        }
        return tvShow;
      });
    return this.getById(id);
  }
}

module.exports = new TvShowService();
