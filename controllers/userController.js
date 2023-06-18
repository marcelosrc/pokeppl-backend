const pool = require("../config/database");

const readMyUser = async (req, res) => {
  const userId = req.session.userId;
  pool.query(
    "SELECT * FROM user_details WHERE id = $1",
    [userId],
    (err, cb) => {
      if (!err) {
        res.status(200).send({ message: cb.rows[0] });
      } else {
        res.status(400).send({ message: err.stack });
      }
    }
  );
};

const readAnyUsers = async (req, res) => {
  const userId = req.session.userId;
  pool.query(`SELECT * FROM user_details WHERE id <> ${userId}`, (err, cb) => {
    if (!err) {
      res.status(200).send({ message: cb.rows });
    } else {
      res.status(400).send({ message: err.stack });
    }
  });
};

module.exports = {
  readMyUser,
  readAnyUsers,
};
