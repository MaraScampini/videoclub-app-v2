const ShowsControllers = {};
const { Op, Sequelize } = require('sequelize');
const models = require('../models/index');
const sequelize = require('../db/db')


// Get all shows
ShowsControllers.getAll = async (req, res) => {
  let resp = await models.Shows.findAll();
  res.send(resp);
}
// Get top rated shows
ShowsControllers.getTopRated = async (req, res) => {
  let resp = await models.Shows.findAll({
    where: {
      vote_average: {
        [Op.gt]: 8,
      }
    }
  })
  res.send(resp);
};
// Get shows by ID
ShowsControllers.getById = async (req, res) => {
  let id = req.params.id;
  let resp = await models.Shows.findAll({
    where: { id_show: id }
  })
  res.send(resp);
};
// Get shows by title
ShowsControllers.getByTitle = async (req, res) => {
  let title = req.params.title;
  let resp = await models.Shows.findAll({
    where: { title: title }
  })
  res.send(resp);
};
// Get shows with episodes airing next week
ShowsControllers.getByDate = async (req, res) => {
  let resp = await sequelize.query("SELECT * FROM railway.Shows where next_episode BETWEEN (CURDATE()) and (CURDATE() + INTERVAL 7 DAY)");
  res.send(resp);
};
// Get shows with theater passes
ShowsControllers.getByTheater = async (req, res) => {
  let resp = await models.Shows.findAll({
    where: {
      on_theaters: true
    }
  })
  res.send(resp);
}

module.exports = ShowsControllers
