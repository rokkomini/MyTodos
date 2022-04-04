//GET Handle public and protected resources

const express = require("express");
const router = express.Router();

router.get("/user", (req, res) => {
    res.json({ message: "Welcome to Mikas application - user page." });
  });

module.exports = router;