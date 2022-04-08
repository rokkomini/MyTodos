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
const { protect, verifyJWT } = require("../middleware/authMiddleware");

//router.route('/dashboard').get(protect, getTodo).post('/dashboard')(protect, postTodo)

router.get("/dashboard/", verifyJWT, getTodo);

router.post("/dashboard/", verifyJWT, postTodo);

router.put("/dashboard/", updateTodo);

router.delete("/dashboard", deleteTodo);

module.exports = router;
