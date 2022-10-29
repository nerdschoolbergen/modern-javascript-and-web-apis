import { getMoviesFromApi, postMovieToApi } from "./api.js";
import { createMovieCards, createMovieList, removeAllChildNodes } from "./dom.js";

const movieListContainer = document.getElementById("movie-list");
const movieCardsContainer = document.getElementById("movie-cards");
const createMovieForm = document.getElementById("create-movie-form");

(async () => {
  const movies = await getMoviesFromApi();
  
  const moviesList = createMovieList(movies);
  movieListContainer.appendChild(moviesList);

  const movieCards = createMovieCards(movies);
  movieCardsContainer.appendChild(movieCards);
})();

createMovieForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target)
  const title = formData.get("movie-title");
  const overview = formData.get("movie-overview");

  const updatedMovies = await postMovieToApi({ title, overview });
  removeAllChildNodes(movieCardsContainer);

  const movieCards = createMovieCards(updatedMovies)
  movieCardsContainer.appendChild(movieCards);

  e.target.reset();
})