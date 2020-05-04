require('dotenv').config()
var pg = require('pg');
var bodyParser = require('body-parser');

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASS,
};

if (process.env.DB_INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  config.host = `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`;
}

const pool = new pg.Pool(config);

module.exports = {
  query: (text, params, cb) => {
    pool.query(text, params, function (err, result) {
      cb(err, result);
    });
  }
}
