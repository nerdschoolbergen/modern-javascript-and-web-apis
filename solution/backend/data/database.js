import fs from "fs/promises";

const dataFilePath = "./backend/data/movies.json";

export const getMovies = async () => {
  const file = await fs.readFile(dataFilePath);
  return JSON.parse(file);
}

export const insertMovie = async (movie) => {
  const movies = await getMovies();
  const id = movies.length
  const posterUrl = "/movie-posters/default.jpg"

  const updatedMovies = [...movies, {id, posterUrl, ...movie}];
  await fs.writeFile(dataFilePath, JSON.stringify(updatedMovies, null, 2))
}
