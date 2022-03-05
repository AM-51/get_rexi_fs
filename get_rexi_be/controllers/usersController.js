const {
  createUser,
  loginUser,
  getUserByID,
  updateUserData,
  getUsersData,
  getFullUserData,
  removeAdminPrivileges,
  addAdminPrivileges,
} = require("../data/usersData");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signupController = async (req, res) => {
  try {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    };
    await createUser(newUser);
    if (newUser) {
      const token = jwt.sign(
        {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      delete newUser.password;
      res.send({
        token: token,
        user: newUser,
      });
    } else {
      res.status(403).send({ message: "Bad email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    if (user) {
      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user.id,
          isAdmin: user.isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      delete user.password;
      delete user.hashPassword;
      res.send({
        token: token,
        user: user,
      });
    } else {
      res.status(403).send({ message: "Bad email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

const userByIdController = async (req, res) => {
  try {
    const id = await getUserByID(req.params.id);
    res.send({ user: id });
  } catch (err) {
    console.error(err);
  }
};

const userUpdateController = async (req, res) => {
  try {
    const updateUser = {
      id: req.params.id,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      bio: req.body.bio,
    };
    await updateUserData(updateUser);
    if (updateUser) {
      const token = jwt.sign(
        {
          firstName: updateUser.firstName,
          lastName: updateUser.lastName,
          email: updateUser.email,
          id: updateUser.id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );
      delete updateUser.password;
      res.send({
        token: token,
        user: updateUser,
      });
    } else {
      res.status(403).send({ message: "Bad email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

const usersDataController = async (req, res) => {
  try {
    const results = await getUsersData();
    res.send({ users: results });
  } catch (err) {
    console.error(err);
  }
};

const fullUserDataController = async (req, res) => {
  try {
    const userId = req.params.id;
    const singleUserData = await getFullUserData(userId);
    res.send(singleUserData);
  } catch (err) {
    console.error(err);
  }
};

const addAdminController = async (req, res) => {
  try {
    const updateAdmin = {
      id: req.body.id,
      isAdmin: req.body.isAdmin === "Yes" ? 1 : 0,
    };
    await addAdminPrivileges(updateAdmin);
    res.send({
      isAdmin: updateAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
const removeAdminController = async (req, res) => {
  try {
    const updateAdmin = {
      id: req.body.id,
      isAdmin: req.body.isAdmin === "No" ? 0 : 1,
    };
    await removeAdminPrivileges(updateAdmin);
    res.send({
      isAdmin: updateAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  signupController,
  loginController,
  userByIdController,
  userUpdateController,
  usersDataController,
  fullUserDataController,
  addAdminController,
  removeAdminController,
};
