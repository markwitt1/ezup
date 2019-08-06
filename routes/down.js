var express = require('express');
var router = express.Router();

var rimraf = require("rimraf")


var fs = require("fs");
var path = require("path");
var zipFolder = require('zip-folder');
var db = require("./../db");



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('down');
});

router.post('/', function (req, res) {
    console.log(req.body.code)

    db.getFolderName(req.body.code, (folderName) => {
        console.log(folderName);
        var path1 = path.join(__dirname, "..", "uploads", folderName)
        var path2 = path.join(__dirname, "..", "uploads", "archives");

        zipFolder(path1, path.join(path2, folderName + ".zip"), function (err) {
            if (err) {
                console.log('oh no!', err);
            } else {
                res.download(path.join(path2, folderName + ".zip"), (err) => {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        fs.unlink(path.join(path2, folderName + ".zip"), (err) => {
                            if (err) throw err;
                            rimraf(path1, function () { console.log("done"); });
                        })
                    }
                });
            }
        });
    })
});
module.exports = router;