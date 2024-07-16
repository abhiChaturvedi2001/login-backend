const express = require('express');
const router = express.Router();
const { signUp, login } = require("../Controllers/authController")
const { singUpValidation, LoginValidation } = require("../middleware/AuthValidation")

router.post('/login', LoginValidation, login);
router.post('/signup', singUpValidation, signUp)
module.exports = router