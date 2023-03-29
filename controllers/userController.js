const pool = require("../config/database");

const readUser = (req, res) => {
  pool.query("select now()", (err, cb) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send({ now: cb.rows[0].now });
    }
  });
};

module.exports = {
  readUser,
};
