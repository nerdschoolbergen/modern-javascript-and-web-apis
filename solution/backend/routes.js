import express, { Router } from "express";
import { getMovies, insertMovie } from "./data/database.js"

const router = Router();
router.use(express.json());

router.get("/api/movies", async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

router.post("/api/movies", async(req, res) => {
  try {
    await insertMovie(req.body)
    const movies = await getMovies();
    res.status(201).send(movies);
  } catch {
    res.status(500);
  }
});

export default router;