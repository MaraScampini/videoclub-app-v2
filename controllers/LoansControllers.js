const LoansControllers = {};
const { Op } = require("sequelize");
const models = require("../models/index");

// Loan a movie
LoansControllers.LoanMovie = async (req, res) => {
  try {
    let body = req.body;
    delete body.date;
    delete body.end_date;
    let movie = await models.Movies.findOne({
      where: { id_movie: body.id },
    });
    let repeated = await models.Loans.findOne({
      where: {
        UserIdUser: req.auth.id,
        ArticleIdArticle: movie.ArticleIdArticle,
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
        }-${new Date().getDate() + 7}`,
        end_date: null,
        UserIdUser: req.auth.id,
        ArticleIdArticle: movie.ArticleIdArticle,
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
// Loan a show
LoansControllers.LoanShow = async (req, res) => {
  try {
    console.log(req.auth.id);
    let body = req.body;
    delete body.date;
    delete body.end_date;
    if (body.email === req.auth?.email) {
      let show = await models.Shows.findOne({
        where: { title: body.name },
      });
      let repeated = await models.Loans.findOne({
        where: {
          UserIdUser: req.auth.id,
          ArticleIdArticle: show.ArticleIdArticle,
        },
      });
      if (!repeated) {
        let resp = await models.Loans.create({
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
          end_date: null,
          UserIdUser: req.auth.id,
          ArticleIdArticle: show.ArticleIdArticle,
        });
        res.status(200).json({
          resp,
          email: req.auth?.email,
          message: "Loan successful!",
        });
      } else {
        res.json({
          message: "You cannot rent a show you already have",
        });
      }
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
    let movie = await models.Movies.findOne({
      where: { title: body.name },
    });
    console.log(movie.title);
    let loanedMovie = await models.Loans.findOne({
      where: {
        ArticleIdArticle: movie.ArticleIdArticle,
        end_date: null,
      },
    });
    console.log(loanedMovie);
    if (
      body.email === req.auth?.email &&
      movie.ArticleIdArticle === loanedMovie.ArticleIdArticle
    ) {
      let resp = await models.Loans.update(
        {
          end_date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()}`,
        },
        {
          where: {
            ArticleIdArticle: loanedMovie.ArticleIdArticle,
          },
        }
      );
    }
    res.status(200).json({
      message: `Loan terminated for the movie ${movie.title}`,
    });
  } catch (error) {
    res.json({ message: "That movie is not loaned" });
    console.error(error);
  }
};
// See my own loans
LoansControllers.getMyLoans = async (req, res) => {
  let resp = await models.Loans.findAll({
    where: {
      UserIdUser: req.auth.id,
    },
  });
  res.status(200).json({
    resp,
    message: "Here are your loans",
  });
};
// See all active loans - ADMIN ONLY
LoansControllers.getAllActive = async (req, res) => {
  let resp = await models.Loans.findAll({
    where: {
      end_date: null,
    },
  });
  // TODO Check this function
  // console.log(resp)
  // const movies = [];
  // await resp.forEach(async(resp) => {
  //   const movie = await models.Shows.findOne({
  //     where: {
  //       ArticleIdArticle: resp.ArticleIdArticle
  //     },
  //     attributes: ['title']
  //   })
  //   movies.push(movie.title)

  // });
  // console.log(movies)

  res.status(200).json({
    message: "These are all the active loans",
    resp,
  });
};
// See all loans - ADMIN ONLY
LoansControllers.getAll = async (req, res) => {
  let resp = await models.Loans.findAll({});
  res.status(200).json({
    message: "These are all the loans",
    resp,
  });
};
// See all loans for a user - ADMIN ONLY
LoansControllers.getByUser = async (req, res) => {
  let { email } = req.params;
  let user = await models.Users.findOne({
    where: {
      email: email,
    },
  });
  let resp = await models.Loans.findAll({
    where: {
      UserIdUser: user.id_user,
    },
  });
  res.status(200).json({
    message: `These are all the loans for ${email}`,
    resp,
  });
};

module.exports = LoansControllers;
