import { getMoviesFromApi, postMovieToApi } from './api.js';
import { createMovieCards, createMovieList, removeAllChildNodes } from './dom.js';

const movieListContainer = document.getElementById('movie-list');
const movieCardsContainer = document.getElementById('movie-cards');
const createMovieForm = document.getElementById('create-movie-form');

(async () => {
  const moviesApiResult = await getMoviesFromApi();
  const { movies } = moviesApiResult;
  
  const moviesList = createMovieList(movies);
  movieListContainer.appendChild(moviesList);

  const movieCards = createMovieCards(movies);
  for(const movieCard of movieCards) {
    movieCardsContainer.appendChild(movieCard);
  }
})();

createMovieForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target)
  const title = formData.get('movie-title');
  const overview = formData.get('movie-overview');

  const moviesApiResult = await postMovieToApi({ title, overview });
  const { movies } = moviesApiResult;

  removeAllChildNodes(movieCardsContainer);

  const movieCards = createMovieCards(movies)
  for(const movieCard of movieCards) {
    movieCardsContainer.appendChild(movieCard);
  }

  e.target.reset();
})