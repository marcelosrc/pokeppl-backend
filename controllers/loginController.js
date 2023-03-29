const notLogged = (req, res) => {
  res.status(400).send({ message: "Não logado" });
};

module.exports = {
  notLogged,
};
