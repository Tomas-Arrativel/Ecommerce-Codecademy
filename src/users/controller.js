const pool = require("../../db");
const queries = require("./queries");

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

const createUser = (req, res) => {
	const { username, password, first_name, last_name } = req.body;

	pool.query(queries.checkUsername, [username], (error, results) => {
		if (results.rows.length) {
			res.send("Username already exists");
		} else {
			// Create user if it doesn't exists
			pool.query(
				queries.createUser,
				[username, password, first_name, last_name],
				(error, results) => {
					if (error) throw error;
					res.status(201).send("User created successfully");
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
		pool.query(
			queries.getUserByLogin,
			[username, password],
			(error, results) => {
				if (error) throw error;
				if (!results.rows.length) {
					res.send("The username or password is not correct");
				} else {
					req.session.username = username;
					req.session.userId = results.rows[0].id;
					req.session.fullName = `${results.rows[0].first_name} ${results.rows[0].last_name}`;

					res.send(req.session);
				}
			}
		);
	}
};

module.exports = {
	getUsers,
	getUserById,
	createUser,
	deleteUser,
	LogUser,
};
