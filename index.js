const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require("./routes/userRoutes"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor OK (${process.env.PORT})`);
});
