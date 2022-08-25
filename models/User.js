const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: "toDoUsers",
  }
);

userSchema.pre("save", async function (next) {
  if (this.modifiedPaths().includes("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
};

exports.User = mongoose.model("User", userSchema);
