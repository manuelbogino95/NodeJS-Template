const express = require('express');
const { userController } = require('../controllers');
const { authMiddleware } = require('../middlewares');

const userRouter = new express.Router();

userRouter.get('/me', authMiddleware, userController.getUserHandler);
userRouter.patch('/me', authMiddleware, userController.patchProfileUpdateHandler);
userRouter.delete('/me', authMiddleware, userController.deleteUserHandler);

module.exports = userRouter;
