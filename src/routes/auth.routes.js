const express = require('express');
const authController = require('../controllers/auth.controller');

const authRouter = new express.Router();

authRouter.post('/login', authController.postLoginHandler);

module.exports = authRouter;
