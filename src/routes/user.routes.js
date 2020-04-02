const express = require('express');
const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const userRouter = new express.Router();

userRouter.get('/me', authMiddleware, userController.getUserHandler);
userRouter.patch('/me', authMiddleware, userController.patchProfileUpdateHandler);

module.exports = userRouter;
