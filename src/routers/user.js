const http = require("http");
const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = new express.Router();

// sign up user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// login user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

// read login user profile
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// list all the users
router.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

// update user details
router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "firstName",
    "lastName",
    "email",
    "password",
    "phone",
    "address",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// // Search Api
// router.get("/users/search", async (req, res) => {
//     var job = req.body.input
//     jobModel.find({ $or: [{"title": new RegExp(job)}, { "company": new RegExp(job) }] }).exec(function (err, data) {
//         console.log(data, 'line no.....200')
//         if (err) {
//             console.log("Line no 455", err);
//             res.status(200).json({ 'status': 0, 'msg': 'something went wrong ', 'data': [] });
//         }
//         else {
//             res.status(200).json({ 'status': 1, 'msg': 'Job list fetched successfully', 'data': data });
//         }
//     })
// });

module.exports = router;
