const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOKAPPID,
      clientSecret: process.env.FACEBOOKSECRET,
      callbackURL: "/login/auth/facebook/redirect",
      profileFields: ["id", "displayName", "picture.type(large)", "gender", "name"],
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

app.use(require("./routes/userRoutes"));
app.use(require("./routes/loginRoutes"));
app.use(require("./routes/gameMechanicsRoutes"));

app.listen(process.env.SVPORT, () => {
  console.log(`Servidor OK (${process.env.SVPORT})`);
});
