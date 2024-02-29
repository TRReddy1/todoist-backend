const express = require("express");
const router = express.Router();
const { users } = require("../models");
const { userSchema, loginSchema } = require("../helpers/validations");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userAuthenticate = require("../helpers/auth_user");
const userLogger = require("../logger/userLogger");

//middleware for login authorization
router.use("/logged", userAuthenticate);

router.post("/register", async (req, res) => {
  // console.log(userLogger().error);
  try {
    const result = await userSchema.validateAsync(req.body);
    const user = await users.findOne({ where: { email: result.email } });
    if (user) {
      throw new Error("email already existed");
    }
    const hashPassword = await bcrypt.hash(result.password, 10);
    const newUser = await users.create({
      name: result.name,
      email: result.email,
      password: hashPassword,
    });
    //generate jwt
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });
    // console.log(token);
    const { id, name, email, password } = newUser;
    userLogger().info(name, token);
    res.json({ id, name, email, password, token });
  } catch (err) {
    userLogger().error(err.message);
    if (err.isJoi) return res.status(422).json(err.message);
    res.status(422).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const details = await loginSchema.validateAsync(req.body);
    const findUser = await users.findOne({ where: { email: details.email } });
    if (!findUser) {
      throw new Error("Email not registered..");
    }
    const isMatch = await bcrypt.compare(details.password, findUser.password);
    if (!isMatch) {
      throw new Error("password is wrong...");
    }
    const token = jwt.sign(
      { userId: findUser.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { id, name, email, password } = findUser;
    userLogger.info(name, token);
    res.json({ id, name, email, password, token });
  } catch (err) {
    userLogger.error(err.message);
    if (err.isJoi) return res.status(422).json(err.message);
    res.status(500).json(err.message);
  }
});

router.get("/logged", async (req, res) => {
  userLogger.info({ user: req.user });
  res.send({ user: req.user });
});
module.exports = router;
