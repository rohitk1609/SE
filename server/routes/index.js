const express = require('express');
const routes = express.Router();
const { users } = require('../controllers');
const { login, register, forms, float, getusers, create_ticket } = require('../controllers');


routes.get("/", users);
routes.post("/login", login);
routes.post("/register", register);
routes.post("/forms",forms);
routes.get("/getusers",getusers);
routes.get("/float",float);
routes.post("/create_ticket",create_ticket);

module.exports = routes;