//POST - Handle signup and sign in actions

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { verifyJWT } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/user", verifyJWT, getUser, (req, res) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});

module.exports = router;
