const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    status: { type: Boolean },
  },
  { timestamps: true },
  {
    collection: "toDos",
  }
);

exports.Todo = mongoose.model("Todo", todoSchema);
