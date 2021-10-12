const express = require('express');
const authController = require('../controllers/auth');
const verifySignUp = require("../middlewares/verifySignUp");

const router = express.Router();

router.post('/signup',[verifySignUp.checkDuplicateUsernameOrEmail],authController.postsignup);
router.post('/login',authController.login);

module.exports = router;
