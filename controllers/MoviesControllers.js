const MoviesControllers = {};
const { Op } = require("sequelize");
const models = require("../models/index");

// Get all movies
MoviesControllers.getAll = async (req, res) => {
  let resp = await models.Movies.findAll();
  res.send(resp);
};
// Get top rated movies
MoviesControllers.getTopRated = async (req, res) => {
  let resp = await models.Movies.findAll({
    where: {
      vote_average: {
        [Op.gt]: 8,
      },
    },
  });
  res.send(resp);
};
// Get movies by ID
MoviesControllers.getById = async (req, res) => {
  let id = req.params.id;
  let resp = await models.Movies.findAll({
    where: { id_movie: id },
  });
  res.send(resp);
};
// Get movies by title
MoviesControllers.getByTitle = async (req, res) => {
  let title = req.params.title;
  let resp = await models.Movies.findAll({
    where: {
      title: { [Op.like]: `${title}%` },
    },
  });
  res.send(resp);
};
// Get movies by genre
MoviesControllers.getByGenre = async (req, res) => {
  let genre = req.params.genre;
  let resp = await models.Movies.findAll({
    attributes: ["title", "genre"],
    where: { genre: genre },
  });
  res.send(resp);
};

module.exports = MoviesControllers;
