const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {type: String},
    text: { type: String, required: true },
    attachments: [{String}],
    finished: { type: Boolean },
  },
  { timestamps: true },
  {
    collection: "toDos",
  }
);

const Todo = mongoose.model("Todo", todoSchema);

exports.Todo = Todo;

