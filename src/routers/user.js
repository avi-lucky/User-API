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

// Search Api
router.get("/users/search", async (req, res) => {
  const username = req.boby;
  const userData = await User.find({
    $or: [
      { firstName: req.body.username },
      { lastName: req.body.username },
      { email: req.body.username },
      { number: req.body.username },
    ],
  });
  console.log(userData);
  res.send(userData);
});

module.exports = router;
