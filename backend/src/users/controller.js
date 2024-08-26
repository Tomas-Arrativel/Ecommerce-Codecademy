const pool = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");

const getUsers = (req, res) => {
	pool.query(queries.getUsers, (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

// const getUserById = (req, res) => {
// 	// Parse and validate the ID parameter
// 	const id = parseInt(req.params.id, 10);

// 	// Check if id is valid
// 	if (isNaN(id)) {
// 		return res.status(400).json({ error: "Invalid ID format" });
// 	}

// 	// Perform the query
// 	pool.query(queries.getUserById, [id], (error, results) => {
// 		if (error) {
// 			console.error("Database query error:", error);
// 			return res.status(500).json({ error: "Database query error" });
// 		}

// 		// Check if user was found
// 		if (results.rows.length === 0) {
// 			return res.status(404).json({ error: "User not found" });
// 		}

// 		// Send the user data as response
// 		res.status(200).json(results.rows[0]);
// 	});
// };

const createUser = async (req, res) => {
	let { username, password, first_name, last_name } = req.body;

	// Hashing password
	try {
		const salt = await bcrypt.genSalt(3);
		password = await bcrypt.hash(password, salt);
	} catch (err) {
		console.log(err);
	}

	pool.query(queries.checkUsername, [username], (error, results) => {
		if (results.rows.length) {
			res.send({ message: "", error: true });
		} else {
			// Create user if it doesn't exists
			pool.query(
				queries.createUser,
				[username, password, first_name, last_name],
				(error, results) => {
					if (error) throw error;
					res
						.status(201)
						.send({ message: "User created successfully", error: false });
				}
			);
		}
	});
};

const deleteUser = (req, res) => {
	const id = parseInt(req.params.id);

	pool.query(queries.getUserById, [id], (error, results) => {
		if (error) throw error;
		if (!results.rows.length) {
			res.send("User does not exists");
		} else {
			pool.query(queries.deleteUser, [id], (error, results) => {
				if (error) throw error;
				res.status(200).send("User deleted Successfully");
			});
		}
	});
};

const logUser = (req, res) => {
	const { username, password } = req.body;

	if (username != "" && password != "") {
		pool.query(queries.getUserByLogin, [username], async (error, results) => {
			if (error) throw error;

			// Comparing the plain password to the hashed one
			let correctPass;
			if (results.rows[0] != null) {
				try {
					const hash = results.rows[0].password;
					correctPass = await bcrypt.compare(password, hash);
				} catch (err) {
					console.log(err);
				}

				// Check if there is an error in the username or password
				if (!correctPass) {
					res.send("The username or password is not correct");
				} else {
					// Creating the user to the session
					req.session.username = username;
					req.session.userId = results.rows[0].id;
					req.session.fullName = `${results.rows[0].first_name} ${results.rows[0].last_name}`;

					res.send(req.session);
				}
			} else {
				res.send("The username or password is not correct");
			}
		});
	}
};

const logoutUser = (req, res) => {
	// Check if the session exists
	if (req.session) {
		// Destroy the session
		req.session.destroy((err) => {
			if (err) {
				console.error("Error destroying session:", err);
				return res
					.status(500)
					.send({ message: "Could not log out. Please try again." });
			} else {
				// Optionally, you can clear the cookie on the client side
				res.clearCookie("connect.sid"); // 'connect.sid' is the default session cookie name
				return res.status(200).send({ message: "Logged out successfully." });
			}
		});
	} else {
		res.status(400).send({ message: "No active session found." });
	}
};

const checkAuth = (req, res) => {
	if (req.session.userId) {
		res.json({ isAuthenticated: true });
	} else {
		res.json({ isAuthenticated: false });
	}
};

module.exports = {
	getUsers,
	// getUserById,
	createUser,
	deleteUser,
	logUser,
	logoutUser,
	checkAuth,
};
