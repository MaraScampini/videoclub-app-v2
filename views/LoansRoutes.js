const express = require('express');
const router = express.Router();

const LoansControllers = require('../controllers/LoansControllers');
const {isValidUser, isValidRole, isValidUserID} = require('../middlewares/authMiddleware')

// Loan a movie
router.post('/movie', LoansControllers.LoanMovie)
// Loan a show
router.post('/show', isValidUser(), LoansControllers.LoanShow)
// Terminate a loan
router.patch('/end', isValidUser(), LoansControllers.editLoan)
// See my loans
router.get('/myloans/:id', isValidUserID(), LoansControllers.getMyLoans)
// See all active loans - ADMIN ONLY
router.get('/activeloans', isValidRole("admin"), LoansControllers.getAllActive)
// See all loans - ADMIN ONLY
router.get('/', isValidRole("admin"), LoansControllers.getAll)
// See loans for a determinate user - ADMIN ONLY
router.get('/:email', isValidRole("admin"), LoansControllers.getByUser)



module.exports = router;