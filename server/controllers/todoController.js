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
  res.status(200).json(todoEntries);

  //res.json({ message: "Get todos" });
});

// @route POST api/todo
// @description create a todo
// @access restricted

const postTodo = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const user = req.user.id;
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

// @route PUT /dashboard/:todoId
// @description update todo
// @access restricted
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  //console.log('update todo', todo)

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

  if (todo.status === true){
   return todo.status = false
  } else {
    todo.status = true
  }

const updatedTodo = await todo.findByIdAndUpdate(req.params.id, {
    new: true,
  });

  res.status(200).json({ message: "Todo" });
});

// @route DELETE api/todo
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

module.exports = { postTodo, getTodo, updateTodo, deleteTodo };
