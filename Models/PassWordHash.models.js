const bcrypt = require("bcrypt");
const saltRounds = 10; // Define the number of salt rounds to use

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds); // Generate a salt
  return await bcrypt.hash(password, salt); // Hash the password using the salt
};

exports.verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash); // Compare the password to its hash, Return true if the password matches the hash, false otherwise
};
