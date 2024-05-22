const express = require("express");
const router = express.Router();

const articlesRoutes = require("./articles/routes");
const categoriesRoutes = require("./categories/routes");

module.exports = () => {
  return router
    .use("/articles", articlesRoutes())
    .use("/categories", categoriesRoutes());
};
