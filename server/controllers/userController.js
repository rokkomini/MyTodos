const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// @desc   Register new user
// @route  POST /auth/register/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  let errors = [];

  if (!username || !password) {
    res.status(400);
    errors.push({ msg: "Please fill out all fields" });
    throw new Error("Please fill out all fields");
  }

  if (password.length < 6) {
    res.status(400).send("Password must be at least 6 character - json");
    errors.push({ msg: "Password must be at least 6 characters - push" });
    throw new Error("Password must be at least 6 characters - throw");
  }

  //Check if user exists

  /*  const userExist = await User.findOne({ username });

  if (userExist) {
    res.status(400);
    errors.push({msg: 'Please choose a different username'})
    throw new Error("User already exists");
  }
 */
  if (errors.length > 0) {
    res.status(400).json({ errors });
    throw new Error("Invalid user data");
  } else {
    User.findOne({ username }).then((user) => {
      if (user) {
        res.status(400).json({ msg: "Choose different username - json" });
        errors.push({ msg: "Please choose a different username - push" });
        throw Error("User already exists - throw");
      } else {
        const newUser = new User({ username, password });
        newUser.save();
        if (newUser) {
          res.status(201).json({
            _id: newUser.id,
            username: newUser.username,
            token: generateToken(newUser._id),
          });
        } else {
          res.status(400).json({ errors });
          throw new Error("Invalid user data");
        }
      }
    });
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
    console.log("usercontroller", user);
    const userId = user._id.toString();
    console.log("usercontroller id", userId);
    const token = jwt.sign(
      { userId, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "12h", subject: userId }
    );
    res.json({ message: "Success", token: "Bearer " + token });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc   Get user data
// @route  GET /auth/dashboard/
// @access Private

const getUser = async (req, res) => {
  if (protect) {
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
