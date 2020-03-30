const express = require('express');
const authController = require('../controllers');
const authMiddleware = require('../middlewares');

const authRouter = new express.Router();

authRouter.post('/signin', authController.postSigninHandler);
authRouter.post('/signup', authController.postSignupHandler);
authRouter.get('/me', authMiddleware, authController.getUserHandler);

module.exports = authRouter;
