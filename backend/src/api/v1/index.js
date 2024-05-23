const express = require("express");
const router = express.Router();

const articlesRoutes = require("./articles/routes");
const categoriesRoutes = require("./categories/routes");
const userRoutes = require("./user/routes");

module.exports = () => {
  return router
    .use("/articles", articlesRoutes())
    .use("/categories", categoriesRoutes())
    .use("/user", userRoutes());
};
