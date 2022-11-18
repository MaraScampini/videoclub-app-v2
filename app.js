const express = require('express');
const db = require('./db/db');
const { sequelize } = require('./models/index');
const app = express();
const router = require('./router');
const PORT = 3000;

app.use(express.json());
app.use(router);


app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`)
  // sequelize.sync({ force: true })
  // db.authenticate()
  db.authenticate()
    .then(() => {
      console.log("Conectados a la DB");
    })
    .catch((error) => {
      console.log("Se ha producido un error: " + error);
    });
})