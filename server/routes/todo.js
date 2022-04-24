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
var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + "-" + Date.now);
  },
});
const upload = multer({ storage: Storage })


router.use(express.static(__dirname + "/public"));
router.use("/uploads", express.static("uploads"));

router.get("/dashboard/", verifyJWT, getTodo);

router.post("/dashboard/uploads", verifyJWT, upload.array('attachments'), async(req, res) => {
  console.log('post attachments', req.files)
});

router.post("/dashboard/", verifyJWT, postTodo);


router.get("/dashboard/:id", verifyJWT, getDetailedTodo);

router.patch("/dashboard/:id", verifyJWT, updateTodo);

router.delete("/dashboard/:id", verifyJWT, deleteTodo);

module.exports = router;
