import { deleteMovieToApi, getMoviesFromApi, postMovieToApi } from './api.js';
import { createMovieCard, createMovieList, removeAllChildNodes } from './dom.js';

const movieListContainer = document.getElementById('movie-list');
const movieCardsContainer = document.getElementById('movie-cards');
const createMovieForm = document.getElementById('create-movie-form');

const setupMovieCard = (movies) => {
  for (const movie of movies) {
    const onMovieDeleted = async () => await deleteMovieToApi(movie.id);
    const movieCard = createMovieCard(movie, onMovieDeleted);
    movieCardsContainer.appendChild(movieCard);
  }
}

(async () => {
  const moviesApiResult = await getMoviesFromApi();
  const { movies } = moviesApiResult;
  
  const moviesList = createMovieList(movies);
  movieListContainer.appendChild(moviesList);
  setupMovieCard(movies);

})();

createMovieForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target)
  const title = formData.get('movie-title');
  const overview = formData.get('movie-overview');

  const moviesApiResult = await postMovieToApi({ title, overview });
  const { movies } = moviesApiResult;

  removeAllChildNodes(movieCardsContainer);
  setupMovieCard(movies);

  e.target.reset();
})