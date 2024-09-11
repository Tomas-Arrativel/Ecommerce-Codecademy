const pool = require("../../db");
const queries = require("./queries");

const getOrders = (req, res) => {
	const { userId } = req.body;

	if (userId) {
		pool.query(queries.getOrders, [userId], (error, results) => {
			if (error) throw error;
			res.status(200).send(results.rows);
		});
	} else {
		res.status(403).send("You need to log in to access your orders");
	}
};

module.exports = {
	getOrders,
};
