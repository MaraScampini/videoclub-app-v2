const express = require('express');
const router = express.Router();

const LoansControllers = require('../controllers/LoansControllers');
const {isValidRole} = require('../middlewares/authMiddleware')

// Loan a movie
router.post('/movie', LoansControllers.LoanMovie)
// Terminate a loan
router.patch("/end", LoansControllers.editLoan);
// See my loans
router.get('/myloans', LoansControllers.getMyLoans)
// See all active loans - ADMIN ONLY
router.get('/activeloans', isValidRole("admin"), LoansControllers.getAllActive)
// See all loans - ADMIN ONLY
router.get('/', isValidRole("admin"), LoansControllers.getAll)
// See loans for a determinate user - ADMIN ONLY
router.get('/:id', isValidRole("admin"), LoansControllers.getByUser)



module.exports = router;