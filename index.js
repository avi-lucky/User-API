const express = require("express");
const db = require("./db/mongoose");
const userRouter = require("./src/routers/user");
const path = require("path");
const http = require("http");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(userRouter);

// var jwt = require("jsonwebtoken");
// const User = require("./src/models/user");
// var token = jwt.sign(
//   { _id: "628e06691aba29730da6548f" },
//   "thisismynewproject",
//   {
//     expiresIn: "3 seconds",
//   }
// );
// // console.log(token)

// jwt.verify(token, "thisismynewproject", function (err, token) {
//   // console.log(token)
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});

module.exports = app;
