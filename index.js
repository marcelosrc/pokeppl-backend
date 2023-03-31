const express = require("express");
const app = express();
const session = require("express-session");

const dotenv = require("dotenv");
dotenv.config();

const pool = require("./config/database");
pool.query("select * from pg_settings where name = 'port'", (err, cb) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(`Banco OK (${cb.rows[0].setting})`);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    secret: process.env.SESSIONSECRET,
  })
);

app.use(require("./routes/userRoutes"));
app.use(require("./routes/loginRoutes"));

app.listen(process.env.SVPORT, () => {
  console.log(`Servidor OK (${process.env.SVPORT})`);
});
