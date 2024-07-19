// Gets
const getUsers = "SELECT * FROM users";
const getUsersById = "SELECT * FROM users WHERE id = $1";

// Checks
const checkUsername = "SELECT u FROM users u WHERE u.username = $1";

// Posts
const createUser =
	"INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3, $4)";

// Deletes
const deleteUser = "DELETE FROM users WHERE id = $1";

module.exports = {
	getUsers,
	getUsersById,
	checkUsername,
	createUser,
	deleteUser,
};
