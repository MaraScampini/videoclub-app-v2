const models = require("../models/index");
const {
  assertValidPasswordService,
  assertEmailIsValidService,
  assertEmailIsUniqueService,
  createUserService,
  encryptPasswordService,
} = require("../Services/AuthServices");
require("dotenv").config();

const jsonwebtoken = require("jsonwebtoken");

const authRegisterController = async (req, res) => {
  const body = req.body;

  // Check that the password has a valid structure
  try {
    assertValidPasswordService(body.password);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Invalid password, ${error.message}`);
    return;
  }
  // Chech that the email has a valid structure
  try {
    assertEmailIsValidService(body.email);
  } catch (error) {
    console.error(error);
    res.status(400).send(`Invalid email, ${error.message}`);
    return;
  }
  // Check that the email is not already registered
  try {
    await assertEmailIsUniqueService(body.email);
    console.log("Hola");
  } catch (error) {
    console.error(error);
    res.status(400).send(`Email is already registered`);
    return;
  }
  // Create the new user
  try {
    const UserCreated = await createUserService(body);
    res.status(201).json(UserCreated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const authLoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by their email
    const userFound = await models.Users.findOne({
      where: { email: email },
    });
    if (!userFound) {
      res.status(401).json({ message: "Password or email incorrect" });
      return;
    }

    if (userFound.deleted == true) {
      res.status(401).json({ message: "Access forbidden" });
      return;
    }
    // Encrypt the provided password and check that it matches with the hash in the database
    const hashedPassword = encryptPasswordService(password);

    if (hashedPassword !== userFound.password) {
      res.status(401).json({ message: "Password or email incorrect" });
      return;
    }
    // Create a JSON Web Token and give it to the user
    const secret = process.env.JWT_SECRET;

    if (secret.length < 10) {
      throw new Error("JWT_SECRET is not set");
    }

    const jwt = jsonwebtoken.sign({
      email: userFound.email,
      id: userFound.id_user,
      role: userFound.RoleIdRole.toLowerCase(),
      name: userFound.name,
      username: userFound.username,
      address: userFound.address,
      city: userFound.city
    }, secret);
    res.status(200).json({
      message: "Login successful",
      jwt: jwt,
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  authLoginController,
  authRegisterController,
};
