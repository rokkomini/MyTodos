const asyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authMiddleware");
const { Todo } = require("../models/Todos");
const { User } = require("../models/User");

// @route GET api/todo
// @description get all todo
// @access restricted

const getTodo = asyncHandler(async (req, res) => {
  const todoEntries = await Todo.find({ user: req.user.id })
    .populate("user")
    .sort({ date: -1 });
  res
    .status(200)
    .json(todoEntries)
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
  //res.json({ message: "Get todos" });
});

// @route POST api/todo
// @description create a todo
// @access restricted

const postTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const user = req.user;
  console.log("user:", user);
  let todo = new Todo({
    user: user,
    text: text,
    status: true,
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

  //res.json({ message: "Get todos" });
});

// @route PUT api/todo
// @description update todo
// @access restricted
const updateTodo = asyncHandler(async (req, res) => {
  res.json({ message: "Update todos" });
});

// @route DELETE api/todo
// @description delete a todo
// @access restricted
const deleteTodo = asyncHandler(async (req, res) => {
  res.json({ message: "Delete todos" });
});

module.exports = { postTodo, getTodo, updateTodo, deleteTodo };
