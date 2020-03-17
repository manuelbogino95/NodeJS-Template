const express = require('express');
const postLoginHandler = require('./auth.controller');

const authRouter = new express.Router();

authRouter.post('/login', postLoginHandler);

module.exports = authRouter;
