const jwt = require("jsonwebtoken");
const { users } = require("../models");

const userAuthenticate = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (!authorization.includes("Bearer")) {
      throw new Error("please include bearer token");
    }
    token = authorization.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!userId) {
      throw new Error("unauthorized user");
    }
    req.user = await users.findByPk(userId);
    next();
  } catch (err) {
    console.log(err);
    if (err.isJoi) res.status(401).send(err.message);
  }
};

module.exports = userAuthenticate;
