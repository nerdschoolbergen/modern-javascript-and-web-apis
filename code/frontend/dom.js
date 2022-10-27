const createMovieCard = (movie) => {
  const wrapper = document.createElement("div");
  const movieHeader = document.createElement("h2");
  movieHeader.innerText = movie.name;

  const movieDescription = document.createElement("p");
  movieDescription.innerText = movie.description;

  wrapper.id = movie.id;
  wrapper.className = "movie-card";
  wrapper.appendChild(movieHeader);
  wrapper.appendChild(movieDescription);

  return wrapper;
}

export const createMovieCards = (movies) => {
  const movieCards = document.createElement("div");

  for (const movie of movies) {
    const movieCard = createMovieCard(movie);
    movieCards.appendChild(movieCard);
  }

  return movieCards;
}

export const createMovieList = (movies) => {
  const moviesList = document.createElement("ul");

  for (const movie of movies) {
    const movieListEntry = document.createElement("li");
    movieListEntry.innerText = movie.name;
    moviesList.appendChild(movieListEntry);
  }

  return moviesList;
}


export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}