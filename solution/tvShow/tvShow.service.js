'use strict';
const TvShow = require('./TvShow');

const tvShows = [];

const postTvShow = (tvShow) => {
  tvShows.push(tvShow);
  return tvShow;
};

const putTvShow = (thShowId) => {

};

const getTvShow = (id) => {

};

const getAllTvShows = () => {
  return tvShows;
};

module.exports = {
  postTvShow,
  putTvShow,
  getTvShow,
  getAllTvShows,
};
