const express = require('express');
const { authController } = require('../controllers');

const authRouter = new express.Router();

authRouter.post('/signin', authController.postSigninHandler);
authRouter.post('/signup', authController.postSignupHandler);

module.exports = authRouter;
