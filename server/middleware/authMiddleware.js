const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  //console.log(req.headers["x-access-token"])
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed to authenticate",
        });
      req.user = {};
      req.user.id = decoded.userId;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res
      .status(401)
      .json({ message: "Incorrect token", isLoggedIn: false })
      .redirect('/auth/login/')
  }
});

module.exports = { verifyJWT };
