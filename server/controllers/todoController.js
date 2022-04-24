const asyncHandler = require("express-async-handler");
const { Todo } = require("../models/Todos");
const { User } = require("../models/User");
const { title } = require("process");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// @route GET api/todo
// @description get all todo
// @access restricted

const getTodo = asyncHandler(async (req, res) => {
  const todoEntries = await Todo.find({ user: req.user.id })
    .populate("user")
    .sort({ createdAt: -1 });
  res.status(200).json(todoEntries);
});

// @route POST api/todo
// @description create a todo
// @access restricted

const postTodo = asyncHandler(async (req, res) => {
  const { title, text } = req.body;
  const user = req.user.id;
  let todo = new Todo({
    user: user,
    title: title,
    text: text,
    finished: false,
  });
  await todo
    .save()
    .then((data) =>
      res
        .json({ message: "Todo added successfully", data })
        .catch(
          err
            .status(400)
            .json({ message: "Failed to add todo", error: err.message })
        )
    );
});
// @route POST api/todo
// @description add files to todo
// @access restricted

// const uploadAttachments = upload.array("attachments");

// @route PUT /dashboard/:todoId
// @description update todo
// @access restricted
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  console.log("update todo", todo);

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

  if (todo.finished === false) {
    await Todo.findByIdAndUpdate(req.params.id, {
      finished: true,
    });
  } else {
    await Todo.findByIdAndUpdate(req.params.id, {
      finished: false,
    });
  }

  /* const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
    finished: true
  }); */

  res.status(200).json({ message: "Todo" });
});

// @route DELETE /todo
// @description delete a todo
// @access restricted
const deleteTodo = asyncHandler(async (req, res) => {
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

  await todo.remove();
  res.status(200).json({ id: req.params.id });
});

// @route GET /todo/:todoId
// @description get detailtodo todo
// @access restricted

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

module.exports = { postTodo, getTodo, updateTodo, deleteTodo, getDetailedTodo };
