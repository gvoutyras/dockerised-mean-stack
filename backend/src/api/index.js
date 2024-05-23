const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

let v1Routes = require("./v1");

module.exports = () => {
  router.use((req, res, next) => {
    console.log(`${"[Start]"} ${req.method} /api${req.url}`);
    return next();
  });

  router.use((req, res, next) => {
    const token = req.headers["authorization"]?.split("Bearer ")[1];
    if (req.url.includes("/user/login") || req.url.includes("/user/register")) {
      return next();
    }

    if (token === undefined) {
      return res.status(401).json({
        success: false,
        message: "No JWT token",
      });
    }

    try {
      const decode = jwt.verify(token, "your-secret-key");
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "JWT token malformed",
      });
    }
    return next();
  });

  router.use("/v1", v1Routes());

  return router;
};
