const login = (req, res) => {
  req.session.userId = req.body.username;
  res.status(200).send({ message: req.session });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = {
  login,
  logout,
};
