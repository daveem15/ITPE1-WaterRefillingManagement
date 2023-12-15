const { queries } = require("../config/queries");
const connection = require("../config/connection");
const { hashPassword } = require("../security/encryption");

async function createUser(user) {
  try {
    const hashedPassword = await hashPassword(user.password);
    const params = [
      user.fullname,
      user.email,
      user.address,
      hashedPassword,
      user.mobileNumber,
      user.gender,
      user.age,
    ];

    await connection(queries.USER_QUERIES.INSERT_USER, params);
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

async function getUserByID(id) {
  try {
    const result = await connection(queries.USER_QUERIES.GET_USER_BY_ID, [id]);
    return result;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return [];
  }
}

async function getUserByEmail(email) {
  try {
    const result = await connection(queries.USER_QUERIES.GET_USER_BY_EMAIL, [
      email,
    ]);
    return result;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return [];
  }
}

async function updateUser(id, updatedUser) {
  try {
    const { email, address, password, mobile_number, gender, age } =
      updatedUser;
    const params = [email, address, password, mobile_number, gender, age, id];

    await connection(queries.USER_QUERIES.UPDATE_USER, params);
    return true;
  } catch (error) {
    console.error("Error updating user:", error);
    return false;
  }
}

async function getAllUsers() {
  try {
    const result = await connection(queries.USER_QUERIES.GET_ALL_USERS);
    return result;
  } catch (error) {
    console.error("Error updating user:", error);
    return [];
  }
}

async function deleteUser(uid) {
  try {
    await connection(queries.USER_QUERIES.DELETE_USER, uid);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
}

module.exports = {
  createUser,
  getUserByID,
  getUserByEmail,
  deleteUser,
  updateUser,
  getAllUsers,
};
