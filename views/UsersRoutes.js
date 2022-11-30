const express = require('express');
const router = express.Router();
const { authBearerMiddleware, isValidRole, isvali, isValidUser, isValidUserID } = require("../middlewares/authMiddleware")


const UsersControllers = require('../controllers/UsersControllers')

// See all users (admin only)
router.get('/all', isValidRole("admin"), UsersControllers.getAllActiveUsers)
// See all deleted users (admin only)
router.get('/deleted', isValidRole("admin"), UsersControllers.getAllDeletedUsers)
// See my info
router.get('/:email', isValidUser(), UsersControllers.getData);
// Delete a user - ADMIN ONLY
router.patch('/delete', isValidRole("admin"), UsersControllers.deleteUser);
// Update my profile
router.patch('/edit', UsersControllers.patchUser);


module.exports = router;