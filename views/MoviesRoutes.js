const express = require('express');
const router = express.Router();

const MoviesControllers = require('../controllers/MoviesControllers')


// All movies
router.get('/', MoviesControllers.getAll);
// Top rated movies
router.get('/tr', MoviesControllers.getTopRated);
// Movies by ID
router.get('/:id', MoviesControllers.getById);
// Movies by title
router.get('/title/:title', MoviesControllers.getByTitle);
// Movies by genre
router.get('/genre/:genre', MoviesControllers.getByGenre);

module.exports = router;