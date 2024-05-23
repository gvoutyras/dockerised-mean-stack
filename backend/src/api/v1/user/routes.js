const express = require("express");
const router = express.Router();
const services = require("./services");

module.exports = () => {
  router.post("/register", services.register).post("/login", services.login);

  return router;
};
