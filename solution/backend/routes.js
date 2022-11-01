import express, { Router } from 'express';
import { deleteMovie, getMovies, insertMovie } from './data/database.js'

const router = Router();
router.use(express.json());

router.get('/movie', async (req, res) => {
  const movies = await getMovies();
  res.send(movies);
});

router.post('/movie', async (req, res) => {
  await insertMovie(req.body)
  const movies = await getMovies();
  res.status(201).send(movies);
});

router.delete('/movie/:id', async (req, res) => {
  await deleteMovie(req.params.id);
  res.sendStatus(200);
})

export default router;