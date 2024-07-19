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
	pool.query(queries.getUsersById, [id], (error, results) => {
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

module.exports = {
	getUsers,
	getUserById,
	createUser,
};
