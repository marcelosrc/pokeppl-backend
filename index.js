const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const pool = require("./config/database");
pool.query("select * from pg_settings where name = 'port'", (err, cb) => {
  if (!err) {
    console.log(`Banco OK (${cb.rows[0].setting})`);
  } else {
    console.log(err.stack);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes/userRoutes"));

app.listen(process.env.SVPORT, () => {
  console.log(`Servidor OK (${process.env.SVPORT})`);
});
