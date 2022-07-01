const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const { verifyJWT } = require("../middleware/authMiddleware");

// @desc   Register new user
// @route  POST /auth/register/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  let errors = [];

  if (!username || !password) {
    errors.push({ msg: "Please fill out all fields" });
    res.status(400);
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
    res
      .status(400)
    
  }

  //Check if user exists

  const userExist = await User.findOne({ username });

  if (userExist) {
    errors.push({ msg: "Please choose a different username" });
    res.status(400)
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    const newUser = new User({ username, password });
    newUser.save();
    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        token: generateToken(newUser._id),
        redirect: true,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
      throw new Error("Invalid user data");
    }
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
    const userId = user._id.toString();
    const token = jwt.sign(
      { userId, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "12h", subject: userId }
    );
    res.json({
      message: "Valid credentials",
      token: "Bearer " + token,
      redirect: true,
    });
  } else {
    res.status(400).json({ message: "Wrong username or password", redirect: false });
    throw new Error("Invalid credentials");
  }
});

// @desc   Get user data
// @route  GET /auth/dashboard/
// @access Private

const getUser = async (req, res) => {
  if (verifyJWT) {
    res.json({ isLoggedIn: true, username: req.user.username });
  }
};
/* const getUser = asyncHandler(async (req, res) => {
  const { _id, username } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    username,
  });
  //res.json({ message: "User data display" });
}); */

//Generate JWTtoken

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "12h" });
};

module.exports = { registerUser, loginUser, getUser };
