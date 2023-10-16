const pool = require("../config/database");

const readMyUser = async (req, res) => {
  const currentUser = req.session.passport.user;
  pool.query(
    `SELECT *
    FROM users
    WHERE facebook_id = $1`,
    [currentUser.id],
    (err, cb) => {
      if (!err) {
        res.status(200).send({ message: cb.rows[0] });
      } else {
        res.status(400).send({ message: err.stack });
      }
    }
  );
};

const readAnyUser = async (req, res) => {
  const anyUser = req.params.id;
  pool.query(
    `SELECT *
    FROM users
    WHERE id = $1`,
    [anyUser],
    (err, cb) => {
      if (!err) {
        res.status(200).send({ message: cb.rows[0] });
      } else {
        res.status(400).send({ message: err.stack });
      }
    }
  );
};

module.exports = {
  readMyUser,
  readAnyUser,
};
