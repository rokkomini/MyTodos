const express = require("express");
const {
  getTodo,
  postTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { verifyJWT } = require("../middleware/authMiddleware");

const {
  updateTodoDetail,
  getDetailedTodo,
} = require("../controllers/todoDetailsController");

var Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: Storage });

router.use(express.static(__dirname + "/public"));
router.use("/uploads", express.static("uploads"));

router.get("/dashboard", verifyJWT, getTodo);

router.post("/dashboard", verifyJWT, postTodo);

router.patch("/dashboard/:id", verifyJWT, updateTodo);

router.delete("/dashboard/:id", verifyJWT, deleteTodo);

router.get("/dashboard/details/:id", verifyJWT, getDetailedTodo);

router.patch(
  "/upload",
  upload.array("attachments", 5),
  async (req, res, next) => {
    const files = req.files
    files.forEach(element => {
      console.log('backend files', element)
    });
    res.send('Files uploaded successfully');
  }
);

router.patch("/dashboard/details/:id", verifyJWT, updateTodoDetail);

router.delete("/dashboard/details/:id", verifyJWT);

module.exports = router;
