const express = require('express');
const router = express.Router();
const { authBearerMiddleware, isValidRole, isvali, isValidUser, isValidUserID } = require("../middlewares/authMiddleware")


const UsersControllers = require('../controllers/UsersControllers')

// See my info
router.get('/:email', isValidUser(), UsersControllers.getData);
// Delete a user - ADMIN ONLY
router.patch('/delete', isValidRole("admin"), UsersControllers.deleteUser);
// Update my profile
router.patch('/edit', UsersControllers.patchUser);


module.exports = router;