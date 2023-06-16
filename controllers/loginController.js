const pool = require("../config/database");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: "ERR" });
  }
  try {
    const query = await pool.query(
      "SELECT id, password FROM users WHERE username = $1",
      [username]
    );
    if (!query.rows[0] || query.rows[0].password !== password) {
      return res.status(401).send({ message: "ERR" });
    }
    req.session.userId = query.rows[0].id;

    console.log(req.rawHeaders);

    return res.status(200).send(req.session);
  } catch (err) {
    return res.status(401).send({ message: err });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).send(req.session);
};

module.exports = {
  login,
  logout,
};
