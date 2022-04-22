//GET Handle public and protected resources

const express = require("express");
const {
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo,
  getDetailedTodo,
  uploadFiles,
} = require("../controllers/todoController");
const router = express.Router();
const { getUser } = require("../controllers/userController");
const { verifyJWT } = require("../middleware/authMiddleware");


router.get("/dashboard/", verifyJWT, getTodo);

router.post("/dashboard/", verifyJWT, postTodo, uploadFiles);

router.get("/dashboard/:id", verifyJWT, getDetailedTodo);

router.patch("/dashboard/:id", verifyJWT, updateTodo);

router.delete("/dashboard/:id", verifyJWT, deleteTodo);

module.exports = router;
