var express = require("express");
var router = express.Router();
var multer = require("multer");
var fs = require("fs");
var path = require("path");

var db = require("./../db");

db.connect();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var userId = req.session.id;
    var dir = path.join(__dirname, "..", "uploads", userId);
    fs.access(dir, (err) => {
      if (err) {
        console.log("creating dir");
        fs.mkdir(dir, function (e) {
          if (e) throw e;
          cb(null, dir);
        });
      } else {
        cb(null, dir);
      }
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("up");
});

router.post("/", upload.any(), (req, res, next) => {
  console.log(req.files);
  res.end();
});

router.get("/success", (req, res, next) => {
  var userId = req.session.id;
  var dir = path.join(__dirname, "..", "uploads", userId);
  fs.exists(dir, function (exists) {
    if (!exists) {
      res.status(401).end();
    } else {
      db.checkUser(req.session.id, (valid) => {
        if (valid) {
          return res.send(
            "You already uploaded today. Restart your browser or try again tomorrow"
          );
        }
        db.newEntry(
          { folderName: req.session.id, dlLink: "yolo" },
          (idNumber) => {
            res.render("up_success", { code: idNumber });
          }
        );
      });
    }
  });
});

module.exports = router;
