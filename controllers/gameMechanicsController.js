const pool = require("../config/database");

const captureUser = async (req, res) => {
  const currentUser = req.session.passport.user;
  const anyUserId = req.params.anyUserId;
  if (Math.random() < process.env.CAPTURECHANCE) {
    pool.query(
      `UPDATE users
      SET captured_ppl = array_append(captured_ppl, ${anyUserId})
      WHERE facebook_id = $1;`,
      [currentUser.id],
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
  const currentUser = req.session.passport.user;
  const anyUserId = req.params.anyUserId;
  pool.query(
    `UPDATE users
    SET captured_ppl = array_remove(captured_ppl, ${anyUserId})
    WHERE facebook_id = $1;`,
    [currentUser.id],
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
    `SELECT name, ARRAY_LENGTH(captured_ppl, 1) AS captured_ppl_count
    FROM pokeppl.users
    ORDER BY captured_ppl_count`,
    (err, cb) => {
      if (!err) {
        res.status(200).send({ message: cb.rows });
      } else {
        res.status(400).send({ message: err.stack });
      }
    }
  );
};

const people = async (req, res) => {
  const currentUser = req.session.passport.user;
  pool.query(
    `SELECT *
    FROM users
    WHERE facebook_id <> $1
    AND id NOT IN (SELECT UNNEST(captured_ppl)
    FROM users WHERE facebook_id = $1)`,
    [currentUser.id],
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
  const currentUser = req.session.passport.user;
  pool.query(
    `SELECT itm.id, itm.item, inv.quantity
    FROM inventory inv
    JOIN items itm ON inv.item = itm.id
    WHERE inv.id = ${currentUser.id}`,
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
  const currentUser = req.session.passport.user;
  pool.query(
    `SELECT *
    FROM users
    WHERE id = ANY(
      SELECT UNNEST(captured_ppl)
      FROM users
      WHERE facebook_id = $1
    );`,
    [currentUser.id],
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
  people,
  inventory,
  shelter,
};
