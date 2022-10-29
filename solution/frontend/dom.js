const createMovieCard = (movie) => {
  const movieCard = document.createElement("div");
  movieCard.id = movie.id;
  movieCard.className = "movie-card";

  // Create a div container containing a header and a 
  // paragraph for the title and overview of a movie. 

  const contentContainer = document.createElement("div");
  contentContainer.class = "content";

  const movieHeader = document.createElement("h2");
  movieHeader.innerText = movie.title;

  const movieOverview = document.createElement("p");
  movieOverview.innerText = movie.overview;

  contentContainer.appendChild(movieHeader);
  contentContainer.appendChild(movieOverview);

  // Create a div container and a image element
  // to position and show the image.

  const movieImage = document.createElement("img");
  movieImage.src = movie.posterUrl;

  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";

  imageContainer.appendChild(movieImage);


  // Add the containers containing the image 
  // and text content to the card

  movieCard.appendChild(imageContainer);
  movieCard.appendChild(contentContainer);

  return movieCard;
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
    movieListEntry.innerText = movie.title;
    moviesList.appendChild(movieListEntry);
  }

  return moviesList;
}


export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}