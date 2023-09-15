const express = require('express');
const Movie = require('../models/moMovie');
const router = express.Router();

// Middleware for logging requests
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
  next();
});

// list all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({});
    const moviesWithIds = movies.map(movie => ({
      id: movie._id,
      title: movie.title,
      director: movie.director,
      year: movie.year
    }));
    res.json(moviesWithIds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific movie by ID
router.get('/:id', (req, res) => {
  const movieId = req.params.id;

  Movie.findById(movieId, (err, movie) => {
    if (err || !movie) {
      return res.status(404).send('Movie not found');
    }
    const movieId = movie._id;
    res.send(`Movie ID: ${movieId}`);
  });
});

// Add a new movie by ID
router.post('/', async (req, res) => {
  const { title, director, year } = req.body;
  const movie = new Movie({ title, director, year });

  try {
    const savedMovie = await movie.save();
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, director, year } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, director, year },
      { new: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(updatedMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;