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
    id                  INTEGER NOT NULL PRIMARY KEY,
    product_name                VARCHAR(50) NOT NULL,
    type                VARCHAR(50) NOT NULL,
    create_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_products_name UNIQUE (name)
);

  CREATE TABLE IF NOT EXISTS warehouse(
    id                  INTEGER NOT NULL PRIMARY KEY,
    product_id          INTEGER NOT NULL,
    CONSTRAINT warehouse_product_id FOREIGN KEY (product_id) REFERENCES public.products (id)
    entir_price         INTEGER NOT NULL,
    exit_price          INTEGER NOT NULL,
    product_count       INTEGER NOT NULL,
    begin_time          TIMESTAMP NOT NULL,
    end_time            TIMESTAMP NOT NULL,
    status              INTEGER DEFAULT 10,
    create_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS box_office(
  id                  INTEGER NOT NULL PRIMARY KEY,
  product_id          INTEGER NOT NULL,
  CONSTRAINT warehouse_product_id FOREIGN KEY (product_id) REFERENCES public.products (id)
  sales_count         INTEGER NOT NULL,
  create_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
  `, function (err) {
    if (err) return callback(err)
    callback();
  });
};

exports.down = function(db, callback) {
  db.runSql(`
  DROP TABLE IF EXISTS box_office;
  DROP TABLE IF EXISTS warehouse;
  DROP TABLE IF EXISTS products;
  `, function (err) {
if (err) return callback(err);
callback();
});
};

exports._meta = {
  "version": 1
};
