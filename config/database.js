const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPW,
  port: process.env.PGPORT,
});

module.exports = pool;
