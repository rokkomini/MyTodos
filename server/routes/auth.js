//POST - Handle signup and sign in actions

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const JWT_SECRET = "8rew8f3jsddfhg846517sdfgfdx167ggf623jd3";

/* router.get("/", (req, res) => {
  res.json({ message: "Welcome to Mikas application." });
});
 */


router.use((req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
  }
  next();  
});

 const requireLogin = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

router.get("/login", requireLogin, (req, res) => {
  res.json('Login page');
});

router.post("/token", async (req, res) => {
  console.log('hello')
  const {username, password} = req.body;
  const user = await User.login(username, password);
  if (user) {
      const userId = user._id.toString();
      const token = jwt.sign(
          {userId, username: user.username},
          JWT_SECRET,
          {expiresIn: "1h", subject: userId}
      );
      res.json({token});
  } else {
      res.sendStatus(401);
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.json({ username });
});


module.exports = router;
