const LoansControllers = {};
const models = require("../models/index");

// Loan a movie
LoansControllers.LoanMovie = async (req, res) => {
  try {
    console.log("Loan");
    let body = req.body;
    delete body.date;
    delete body.end_date;
    let movie = await models.Movies.findOne({
      where: { id_movie: body.id },
    });
    let repeated = await models.Loans.findOne({
      where: {
        UserIdUser: req.auth.id,
        MovieIdMovie: body.id,
        end_date: null,
      },
    });
    if (!repeated) {
      let resp = await models.Loans.create({
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
        return_date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()}`,
        end_date: null,
        UserIdUser: req.auth.id,
        MovieIdMovie: body.id,
      });

      res.status(200).json({
        resp,
        email: req.auth?.email,
        message: "Loan successful!",
      });
    } else {
      res.json({
        message: "You cannot rent a movie you already have",
      });
    }
  } catch (error) {
    res.json({ message: "Error" });
    console.error(error);
  }
};

// Terminate a loan
LoansControllers.editLoan = async (req, res) => {
  try {
    let body = req.body;

    let loanedMovie = await models.Loans.findOne({
      where: {
        MovieIdMovie: body.id,
        end_date: null,
      },
    });
    console.log(loanedMovie);
    if (body.id === loanedMovie.MovieIdMovie) {
      let resp = await models.Loans.update(
        {
          end_date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
        },
        {
          where: {
            UserIdUser: req.auth.id,
            MovieIdMovie: body.id,
          },
        }
      );
    }
    res.status(200).json({
      message: `Loan terminated for the movie`,
    });
  } catch (error) {
    res.json({ message: "That movie is not loaned" });
    console.error(error);
  }
};
// See my own loans
LoansControllers.getMyLoans = async (req, res) => {
  try {
    let resp = await models.Loans.findAll({
      where: {
        UserIdUser: req.auth.id,
        end_date: null,
      },
      include: models.Movies,
    });
    res.status(200).json({
      resp,
      message: "Here are your loans",
    });
  } catch (error) {
    res.json({ message: "There are no loans" });
  }
};
// See all active loans - ADMIN ONLY
LoansControllers.getAllActive = async (req, res) => {
  let resp = await models.Loans.findAll({
    where: {
      end_date: null,
    },
    include: [models.Users, models.Movies],
  });

  res.status(200).json({
    message: "These are all the active loans",
    resp,
  });
};
// See all loans - ADMIN ONLY
LoansControllers.getAll = async (req, res) => {
  let resp = await models.Loans.findAll({
    include: [models.Users, models.Movies],
  });
  res.status(200).json({
    message: "These are all the loans",
    resp,
  });
};
// See all loans for a user - ADMIN ONLY
LoansControllers.getByUser = async (req, res) => {
  let { id } = req.params;

  let resp = await models.Loans.findAll({
    where: {
      UserIdUser: id,
    },
    include: models.Movies,
  });
  res.status(200).json({
    message: `These are all the loans`,
    resp,
  });
};

module.exports = LoansControllers;
