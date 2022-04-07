//GET Handle public and protected resources

const express = require("express");
const {
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const router = express.Router();
const { getUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

//router.route('/dashboard').get(protect, getTodo).post('/dashboard')(protect, postTodo)

router.get("/dashboard/", protect, getTodo);

router.get("/dashboard/me", protect, getUser);

router.post("/dashboard/", protect, postTodo);

router.put("/dashboard", updateTodo);

router.delete("/dashboard", deleteTodo);

module.exports = router;
