'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.runSql(`
  CREATE TABLE IF NOT EXISTS products(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    entir_price NUMERIC NOT NULL,
    exit_price NUMERIC NOT NULL,
    begin_time  TIMESTAMP NOT NULL,
    end_time  TIMESTAMP NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `, function (err) {
    if (err) return callback(err)
    callback();
  });
};

exports.down = function(db, callback) {
  db.runSql(`
  DROP TABLE IF EXISTS products;
  `, function (err) {
if (err) return callback(err);
callback();
});
};

exports._meta = {
  "version": 1
};
