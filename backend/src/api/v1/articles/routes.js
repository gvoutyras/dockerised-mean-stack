const express = require("express");
const router = express.Router();
const services = require("./services");

module.exports = () => {
  router
    .post("/new", services.createArticle)
    .get("/fetchMany", services.fetchManyArticles)
    .get("/fetch/:id", services.fetchArticle)
    .post("/edit/:id", services.editArticle)
    .delete("/:id", services.deleteArticle);

  return router;
};
