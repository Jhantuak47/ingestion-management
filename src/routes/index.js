const express = require("express");
const authRouters = require('./auth.route');
const documentRouters = require('./documents.route');

const Router = express.Router();

Router.use('/api/auth', authRouters);
Router.use('/api/documents', documentRouters)


module.exports = Router;