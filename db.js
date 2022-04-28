var { Client } = require("pg");
require("dotenv").config();
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

var connect = function () {
  client
    .connect()
    .then(() => console.log("connected"))
    .catch((e) => console.error("connection error", e.stack));
};

var newEntry = function ({ folderName, dlLink }, callback) {
  var text =
    "INSERT INTO downloadables (folder_name, download_link, active) VALUES ($1,$2,$3) RETURNING id_number";
  var values = [folderName, dlLink, true];

  client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      callback(res.rows[0].id_number);
    }
  });
};

var checkUser = function (userId, callback) {
  client.query(
    "SELECT active FROM downloadables WHERE folder_name = $1",
    [userId],
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        if (res.rows[0]) {
          callback(true);
        } else {
          callback(false);
        }
      }
    }
  );
};

var getFolderName = function (idNumber, callback) {
  client.query(
    "SELECT folder_name FROM downloadables WHERE id_number = $1",
    [idNumber],
    (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        callback(res.rows[0].folder_name);
      }
    }
  );
};

module.exports = {
  client,
  connect,
  newEntry,
  checkUser,
  getFolderName,
};
