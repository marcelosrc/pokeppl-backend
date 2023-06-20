const pool = require("../config/database");

const captureUser = async (req, res) => {
  const userId = req.session.userId;
  const anyUserId = req.params.anyUserId;
  pool.query(
    `UPDATE captured SET captured_ppl = array_append(captured_ppl, ${anyUserId}) WHERE user_id = $1;`,
    [userId],
    (err, cb) => {
      if (!err) {
        res.status(200).send({ message: "OK" });
      } else {
        res.status(400).send({ message: err.stack });
      }
    }
  );
};

const ranking = async (req, res) => {
  pool.query(
    "SELECT username, captured_ppl_count FROM user_details ORDER BY captured_ppl_count DESC",
    (err, cb) => {
      if (!err) {
        res.status(200).send({ message: cb.rows });
      } else {
        res.status(400).send({ message: err.stack });
      }
    }
  );
};

module.exports = {
  captureUser,
  ranking,
};
