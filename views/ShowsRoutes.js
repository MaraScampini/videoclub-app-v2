const express = require('express');
const router = express.Router();

const ShowsControllers = require('../controllers/ShowsControllers')

// All shows
router.get('/', ShowsControllers.getAll);
// Top rated shows
router.get('/tr', ShowsControllers.getTopRated);
// Shows with episodes next week
router.get('/rd', ShowsControllers.getByDate);
// Shows on theaters
router.get('/theater', ShowsControllers.getByTheater)
// Shows by title
router.get('/title/:title', ShowsControllers.getByTitle);
// Shows by ID
router.get('/:id', ShowsControllers.getById);


module.exports = router;