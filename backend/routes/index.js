var express = require('express');
var router = express.Router();
var db = require("../database");
router.use('/users', require('./users'));

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query("SELECT * FROM userscore", "", function(err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result.rows);
    }
  })
});

module.exports = router;

