const express = require('express');
const router = express.Router();

const FavoritesControllers = require('../controllers/FavoritesControllers');
const {isValidUser, isValidRole, isValidUserID} = require('../middlewares/authMiddleware')

// Fav a movie
router.post('/', FavoritesControllers.NewFav)
// Unfav
router.delete("/end", FavoritesControllers.UnFav);
// See my faves
router.get('/myfaves', FavoritesControllers.getMyFavorites)


module.exports = router;