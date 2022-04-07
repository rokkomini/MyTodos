const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");

// @desc   Register new user
// @route  POST /auth/register/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please check all fields");
  }

  //Check if user exists

  const userExist = await User.findOne({ username });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Remove ##
  /* const user = await User.save({
    username,
    password,
  }); */
  const user = new User({ username, password });
  await user.save();

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Authenticate a user
// @route  POST /auth/login/
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Check for username
  const user = await User.login(username, password);
  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc   Get user data
// @route  GET /auth/dashboard/
// @access Private

const getUser = asyncHandler(async (req, res) => {
  const { _id, username } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    username,
  });
  //res.json({ message: "User data display" });
});

//Generate JWTtoken

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });
};

module.exports = { registerUser, loginUser, getUser };
