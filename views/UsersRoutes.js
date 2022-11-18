const express = require('express');
const router = express.Router();
const { authBearerMiddleware, isValidRole, isvali, isValidUser } = require("../middlewares/authMiddleware")


const UsersControllers = require('../controllers/UsersControllers')

// See my info
router.get('/:email', isValidUser(), UsersControllers.getData);
// Update my profile
router.patch('/:email', isValidUser(), UsersControllers.patchUser);
// Delete a user - ADMIN ONLY
router.delete('/:email', isValidRole("admin"), UsersControllers.deleteUser);

module.exports = router;