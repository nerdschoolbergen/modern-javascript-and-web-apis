export const getMoviesFromApi = async () => {
  const response = await fetch("/api/movies");
  return await response.json();
}

export const postMovieToApi = async (movie) => {
  const response = await fetch("/api/movies", {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}
