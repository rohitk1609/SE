const express = require('express');
const routes = express.Router();
const { users } = require('../controllers');
const { login, register, forms,float } = require('../controllers');


routes.get("/", users);
routes.post("/login", login);
routes.post("/register", register);
routes.post("/forms",forms);

routes.get("/float",float);

module.exports = routes;