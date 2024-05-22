const express = require("express");
const router = express.Router();
const services = require("./services");

module.exports = () => {
  router
    .post("/new", services.newCategory)
    .get("/", services.getCategories)
    .delete("/:category", services.deleteCategory);

  return router;
};
