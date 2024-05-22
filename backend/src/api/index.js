const express = require("express");
const router = express.Router();

let v1Routes = require("./v1");

module.exports = () => {
  // TODO add jwt
  router.use((req, res, next) => {
    console.log(`${"[Start]"} ${req.method} /api${req.url}`);
    return next();
  });
  router.use("/v1", v1Routes());

  return router;
};
