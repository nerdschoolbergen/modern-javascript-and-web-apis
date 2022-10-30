import fs from "fs/promises"

const file = await fs.readFile("./basedata.json");

const fileJson = JSON.parse(file);
const mappedMovies = fileJson["results"].map((movie) => ({
    id: movie.id,
    releaseDate: movie.release_date,
    overview: movie.overview,
    title: movie.title,
    voteAverage: movie.vote_average,
    voteCount: movie.vote_count,
    posterUrl: `/movie-posters/${movie.id}.jpg`
}));

const output = {
  'movies': mappedMovies,
};

fs.writeFile("./movies.json", JSON.stringify(output, null, 2));
