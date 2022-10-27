import fs from "fs/promises";

const dataFilePath = "./backend/data/data.json";

export const getMovies = async () => {
  const file = await fs.readFile(dataFilePath);
  return JSON.parse(file);
}

export const insertMovie = async (movie) => {
  const movies = await getMovies();
  const updatedMovies = [...movies, movie];
  await fs.writeFile(dataFilePath, JSON.stringify(updatedMovies, null, 2))
}