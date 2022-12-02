const express = require("express");
const db = require("./db/db");
const { sequelize } = require("./models/index");
const app = express();
const router = require("./router");
let PORT = process.env.DB_PORT || 3000;
const cors = require("cors");
app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

//Config Cors Options
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
  // sequelize.sync({ force: true })
  // db.authenticate()
  db.authenticate()
    .then(() => {
      console.log("Conectados a la DB");
    })
    .catch((error) => {
      console.log("Se ha producido un error: " + error);
    });
});
