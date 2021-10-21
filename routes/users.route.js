const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post("/users", async (req, res) => {
  const request = new User({
    username: req.body.username,
    password: req.body.password,
  });
  await request.save();
  res.send(request);
});

router.get("/users/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });
    res.send(result);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const result = await User.findOne({ _id: req.params.id });

    if (req.body.username) {
      result.username = req.body.username;
    }

    if (req.body.password) {
      result.password = req.body.password;
    }

    await result.save();
    res.send(result);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

module.exports = router;
