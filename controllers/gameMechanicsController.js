const pool = require("../config/database");

const captureUser = async (req, res) => {
  const userId = req.session.userId;
  const anyUserId = req.params.anyUserId;
  if (Math.random() < process.env.CAPTURECHANCE) {
    pool.query(
      `UPDATE captured SET captured_ppl = array_append(captured_ppl, ${anyUserId}) WHERE id = $1;`,
      [userId],
      (err, cb) => {
        if (!err) {
          res.status(200).send({ message: "CAPTURED" });
        } else {
          res.status(400).send({ message: err.stack });
        }
      }
    );
  } else {
    res.status(200).send({ message: "NOT CAPTURED" });
  }
};

const setUserFree = async (req, res) => {
  const userId = req.session.userId;
  const anyUserId = req.params.anyUserId;
  pool.query(
    `UPDATE captured SET captured_ppl = array_remove(captured_ppl, ${anyUserId}) WHERE id = $1;`,
    [userId],
    (err, cb) => {
      if (!err) {
        res.status(200).send({ message: "FREED" });
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

const inventory = async (req, res) => {
  const userId = req.session.userId;
  pool.query(
    `SELECT itm.id, itm.item, inv.quantity FROM inventory inv JOIN items itm ON inv.item = itm.id WHERE inv.id = ${userId}`,
    (err, cb) => {
      if (!err) {
        res.status(200).send({ message: cb.rows });
      } else {
        res.status(400).send({ message: err.stack });
      }
    }
  );
};

const shelter = async (req, res) => {
  const userId = req.session.userId;
  pool.query(
    `SELECT ud.* FROM user_details ud JOIN captured cpt ON ud.id = ANY(cpt.captured_ppl) JOIN users usr ON cpt.id = usr.id WHERE usr.id = ${userId}`,
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
  setUserFree,
  ranking,
  inventory,
  shelter,
};
