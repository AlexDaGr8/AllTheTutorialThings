'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

var dotenv = require('dotenv');

dotenv.config();

var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', function () {
  console.log('connected to the db');
});

/**
 * Create Tables
 */
var createTables = function createTables() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      reflections(\n        id UUID PRIMARY KEY,\n        success VARCHAR(128) NOT NULL,\n        low_point VARCHAR(128) NOT NULL,\n        take_away VARCHAR(128) NOT NULL,\n        created_date TIMESTAMP,\n        modified_date TIMESTAMP\n      )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

/**
 * Drop Tables
 */
var dropTables = function dropTables() {
  var queryText = 'DROP TABLE IF EXISTS reflections';
  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

pool.on('remove', function () {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables: createTables,
  dropTables: dropTables
};

require('make-runnable');