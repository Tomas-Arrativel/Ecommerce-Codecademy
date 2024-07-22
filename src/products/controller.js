const pool = require("../../db");
const queries = require("./queries");

const getProducts = (req, res) => {
	pool.query(queries.getProducts, (error, results) => {
		if (error) throw error;
		res.status(200).send(results.rows);
	});
};

const getProductById = (req, res) => {
	const productId = req.params.id;

	pool.query(queries.getProductById, [productId], (error, results) => {
		if (error) throw error;
		res.status(200).send(results.rows);
	});
};

module.exports = {
	getProducts,
	getProductById,
};
