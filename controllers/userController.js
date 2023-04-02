const pool = require("../config/database");

const readMyUser = async (req, res) => {
  const userId = req.session.userId;
  pool.query(
    "SELECT * FROM user_details WHERE id = $1",
    [userId],
    (err, cb) => {
      if (err) {
        res.status(400).send({ message: err.stack });
      } else {
        res.status(200).send({ message: cb.rows[0] });
      }
    }
  );
};

module.exports = {
  readMyUser,
};
