export const getMoviesFromApi = async () => {
  const response = await fetch('/movie');
  return await response.json();
}

export const postMovieToApi = async (movie) => {
  const response = await fetch('/movie', {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const deleteMovieToApi = async (movieId) => {
  return await fetch(`/movie/${movieId}`, {
    method: 'DELETE',
  });
}