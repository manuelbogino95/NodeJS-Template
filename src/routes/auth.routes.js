const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');

const authRouter = new express.Router();

authRouter.post('/signin', authController.postSigninHandler);
authRouter.post('/signup', authController.postSignupHandler);
authRouter.get('/me', authMiddleware, authController.getUserHandler);

module.exports = authRouter;
