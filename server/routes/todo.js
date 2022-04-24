const express = require("express");
const {
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo,
  getDetailedTodo,
} = require("../controllers/todoController");
const router = express.Router();
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const { verifyJWT } = require("../middleware/authMiddleware");


router.get("/dashboard/", verifyJWT, getTodo);

router.post("/dashboard/", verifyJWT, postTodo);

router.get("/dashboard/:id", verifyJWT, getDetailedTodo);

router.patch("/dashboard/:id", verifyJWT, updateTodo);

router.delete("/dashboard/:id", verifyJWT, deleteTodo);

module.exports = router;
