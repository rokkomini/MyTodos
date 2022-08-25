const multer = require("multer");
const path = require("path");
const util = require("util");

var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null,path.join(`${__dirname}/../../uploads`));
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + "-" + Date.now);
  },
});

var uploadFiles = multer({ storage: Storage }).array("attachments", 10);


var uploadMiddleware = util.promisify(uploadFiles);
module.exports = { uploadMiddleware };
