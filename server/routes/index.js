const express = require('express');
const routes = express.Router();
const { users } = require('../controllers');
const { login, register, forms } = require('../controllers');


routes.get("/", users);
routes.post("/login", login);
routes.post("/register", register);
routes.post("/forms",forms);

module.exports = routes;