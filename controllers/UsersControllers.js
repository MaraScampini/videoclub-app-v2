const UsersControllers = {};
const models = require("../models/index");
const { encryptPasswordService } = require("../Services/AuthServices");

// Get data from my own profile
UsersControllers.getData = async (req, res) => {
  let { email } = req.params;
  let resp = await models.Users.findAll({
    where: { email: email },
  });
  res.send(resp);
};
// Update data from my own profile
UsersControllers.patchUser = async (req, res) => {
  const user = req.body;
  const userFound = await models.Users.findOne({
    where: {
      email: req.auth.email,
    },
  });
  delete user.email;
  let newPassword = userFound.password;
  if (user.password) {
    newPassword = encryptPasswordService(user.password);
  }

  let resp = await models.Users.update(
    {
      name: user.name,
      username: user.username,
      city: user.city,
      address: user.address,
      password: newPassword,
    },
    {
      where: { email: req.auth.email },
    }
  );
  res.json({
    resp,
    message: "Usuario actualizado",
  });
};
// Delete a user - ADMIN ONLY
UsersControllers.deleteUser = async (req, res) => {
  const { email } = req.body;
  let resp = await models.Users.update(
    { deleted: true },
    { where: { email: email } }
  );
  res.json({
    resp,
    message: "Usuario eliminado",
  });
};

module.exports = UsersControllers;
