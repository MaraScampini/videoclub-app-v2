const FavoritesControllers = {};
const models = require("../models/index");

// Loan a movie
FavoritesControllers.NewFav = async (req, res) => {
  try {
    let body = req.body;
    delete body.date;
    delete body.end_date;
    let repeated = await models.Favorites.findOne({
      where: {
        UserIdUser: req.auth.id,
        MovieIdMovie: body.id,
      },
    });
    if (!repeated) {
      let resp = await models.Favorites.create({
        date_faved: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
        UserIdUser: req.auth.id,
        MovieIdMovie: body.id,
      });
      res.status(200).json({
        resp,
        email: req.auth?.email,
        message: "Faved!",
      });
    } else {
      res.json({
        message: "You cannot fav a movie you already have faved",
      });
    }
  } catch (error) {
    res.json({ message: "Error" });
    console.error(error);
  }
};

// Unfav
FavoritesControllers.UnFav = async (req, res) => {
  try {
    let body = req.body;

    let resp = await models.Favorites.destroy({
      where: {
        MovieIdMovie: body.id,
      },
    });

    res.status(200).json({
      message: `Movie Unfaved`,
    });
  } catch (error) {
    res.json({ message: "That movie is not loaned" });
    console.error(error);
  }
};
// See my own Favorites
FavoritesControllers.getMyFavorites = async (req, res) => {
  let resp = await models.Favorites.findAll({
    where: {
      UserIdUser: req.auth.id,
    },
    include: models.Movies,
  });
  res.status(200).json({
    resp,
    message: "Here are your Favorites",
  });
};


module.exports = FavoritesControllers;
