import express, { Router } from "express";
import { getMovies, insertMovie } from "./data/database.js"

const router = Router();
router.use(express.json());

router.get("/movie", async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

router.post("/movie", async (req, res) => {
  await insertMovie(req.body)
  const movies = await getMovies();
  res.status(201).send(movies);
});

export default router;