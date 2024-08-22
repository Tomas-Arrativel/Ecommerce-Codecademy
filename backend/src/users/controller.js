const pool = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");

const getUsers = (req, res) => {
	pool.query(queries.getUsers, (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const getUserById = (req, res) => {
	const id = parseInt(req.params.id);

	pool.query(queries.getUserById, [id], (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

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

const LogUser = (req, res) => {
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

module.exports = {
	getUsers,
	getUserById,
	createUser,
	deleteUser,
	LogUser,
};
