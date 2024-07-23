const pool = require("../../db");
const queries = require("./queries");

const getProductsStored = (req, res) => {
	const userId = req.session.userId;

	if (userId) {
		pool.query(queries.getProductsStored, [userId], (error, results) => {
			if (error) throw error;
			res.status(200).send(results.rows);
		});
	} else {
		res.status(403).send("You have to log in to access your cart");
	}
};

module.exports = {
	getProductsStored,
};
