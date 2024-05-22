const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("./config");
const connectToDb = require("./src/lib/database");
const apiRouter = require("./src/api");

const { backendPort: port } = config;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectToDb(config);

app.use("/api", apiRouter());

// handle 404s
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
