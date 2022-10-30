
export const createMovieCard = (movie, onMovieDeleted) => {
  const movieCard = document.createElement('div');
  movieCard.id = movie.id;
  movieCard.className = 'movie-card';

  // Create a div container containing a header and a 
  // paragraph for the title and overview of a movie. 

  const contentContainer = document.createElement('div');
  contentContainer.className = 'content';

  const movieHeader = document.createElement('h2');
  movieHeader.innerText = movie.title;

  const movieOverview = document.createElement('p');
  movieOverview.innerText = movie.overview;

  contentContainer.appendChild(movieHeader);
  contentContainer.appendChild(movieOverview);

  // Create a div container and a image element
  // to position and show the image.

  const movieImage = document.createElement('img');
  const imageContainer = document.createElement('div');
  movieImage.src = movie.posterUrl;
  imageContainer.className = 'image-container';

  imageContainer.appendChild(movieImage);

  // Create delete button

  const deleteButtonContainer = document.createElement("div");
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "btn-delete";

  deleteButton.addEventListener('click', async () => {
    await onMovieDeleted();
    movieCard.remove();
  });

  deleteButtonContainer.appendChild(deleteButton);

  // Add the containers containing the image 
  // and text content to the card

  movieCard.appendChild(imageContainer);
  movieCard.appendChild(contentContainer);
  movieCard.appendChild(deleteButtonContainer);

  return movieCard;
}

export const createMovieList = (movies) => {
  const moviesList = document.createElement('ul');

  for (const movie of movies) {
    const movieListEntry = document.createElement('li');
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