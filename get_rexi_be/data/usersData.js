const { query } = require("../lib/db");
const SQL = require("@nearform/sql");
const bcrypt = require("bcrypt");

const createUser = async (newUser) => {
  const hashPassword = await bcrypt.hash(newUser.password, 10);
  const sql = SQL`INSERT INTO users (email, hashPassword, firstName, lastName, phoneNumber) VALUES (${newUser.email}, ${hashPassword}, ${newUser.firstName}, ${newUser.lastName}, ${newUser.phoneNumber})`;
  return query(sql);
};

exports.createUser = createUser;

const loginUser = async (email, password) => {
  const [user] = await query(SQL`SELECT * FROM users WHERE email = ${email}`);
  const isValidPass = await bcrypt.compare(password, user.hashPassword);
  if (isValidPass) {
    return user;
  }
};

exports.loginUser = loginUser;

const getUserByID = (id) => {
  return query(SQL`SELECT * FROM users WHERE id = ${id}`);
};

exports.getUserByID = getUserByID;

const updateUserData = async (userUpdate) => {
  const hashPassword = await bcrypt.hash(userUpdate.password, 10);
  const sql = SQL`UPDATE users SET email=${userUpdate.email}, hashPassword=${hashPassword}, firstName=${userUpdate.firstName}, lastName=${userUpdate.lastName}, phoneNumber=${userUpdate.phoneNumber}, bio=${userUpdate.bio} WHERE id=${userUpdate.id}`;
  return query(sql);
};

exports.updateUserData = updateUserData;

const getUsersData = () => {
  return query(SQL`SELECT * FROM users`);
};

exports.getUsersData = getUsersData;

const getFullUserData = async (userId) => {
  const sqlUser = SQL`SELECT * FROM users WHERE users.id = ${userId}`;
  const userData = await query(sqlUser);
  const sqlUserPets = SQL`SELECT * FROM pets WHERE pets.ownerId = ${userId}`;
  const userPetsData = await query(sqlUserPets);
  delete userData[0].hashPassword;
  userData[0].ownedPets = userPetsData;
  return userData[0];
};
exports.getFullUserData = getFullUserData;

const addAdminPrivileges = async (updateAdmin) => {
  const sql = SQL`UPDATE users SET isAdmin=${updateAdmin.isAdmin} WHERE id=${updateAdmin.id}`;
  return query(sql);
};

exports.addAdminPrivileges = addAdminPrivileges;

const removeAdminPrivileges = async (updateAdmin) => {
  const sql = SQL`UPDATE users SET isAdmin=${updateAdmin.isAdmin} WHERE id=${updateAdmin.id}`;
  return query(sql);
};

exports.removeAdminPrivileges = removeAdminPrivileges;
