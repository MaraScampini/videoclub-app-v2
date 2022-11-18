const express = require('express');
const router = express.Router();

const {
  authLoginController,
  authRegisterController
} = require("../controllers/AuthControllers");

router.post("/login", authLoginController);
router.post("/register" , authRegisterController);

module.exports = router;