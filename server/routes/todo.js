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
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const { getUser } = require("../controllers/userController");
const { verifyJWT } = require("../middleware/authMiddleware");


/* if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, cb) {
    callback(null, file.originalname) + '-' + Date.now;
  },
});

const upload = multer({storage: Storage}).array('todo-files', 3)

router.use(express.static(__dirname + "/public"));
router.use("/uploads", express.static("uploads")); */

router.get("/dashboard/", verifyJWT, getTodo);

router.post("/dashboard/", verifyJWT, postTodo);

/* router.post("/dashboard/upload", verifyJWT, uploadFiles); */

router.get("/dashboard/:id", verifyJWT, getDetailedTodo);

router.patch("/dashboard/:id", verifyJWT, updateTodo);

router.delete("/dashboard/:id", verifyJWT, deleteTodo);

module.exports = router;
