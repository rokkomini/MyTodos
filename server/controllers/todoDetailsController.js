const asyncHandler = require("express-async-handler");
const { Todo } = require("../models/Todos");
const { User } = require("../models/User");
const { title } = require("process");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getDetailedTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(401);
    throw new Error("Todo not found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  res.status(200).json(todo);
});

const updateTodoDetail = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  console.log("updaate todo detail", todo);
  const { text } = req.body;

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Todo.findByIdAndUpdate(req.params.id, {
    text: text,
  });

  /* const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
      finished: true
    }); */

  res.status(200).json({ message: "Todo" });
});

module.exports = { getDetailedTodo, updateTodoDetail };
