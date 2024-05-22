const express = require("express");
const router = express.Router();
const services = require("./services");

module.exports = () => {
  router
    .post("/:category", services.newCategory)
    .get("/fetch", services.getCategories)
    .delete("/:category", services.deleteCategory);

  return router;
};
