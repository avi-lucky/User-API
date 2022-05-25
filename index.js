const express = require("express");
const db = require("./db/mongoose");
const userRouter = require("./src/routers/user");
const path = require("path");
const http = require("http");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});

module.exports = app;
