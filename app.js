// THIRD PARTY MODULES
require("dotenv").config("config.env");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// CORE MODULES
const express = require("express");

// SELF MODULES
const UserAuthRouter = require("./route/userAuthRoute");
const productRoute = require("./route/productRoute");

const app = express();

app.options("*", cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  const message = "Hello word";
  res.send({ message });
});

app.use("/auth", UserAuthRouter);
app.use("/api", productRoute);

module.exports = app;
