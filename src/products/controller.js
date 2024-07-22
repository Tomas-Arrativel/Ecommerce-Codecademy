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

const createProduct = (req, res) => {
	if (req.session.userId) {
		const { product, price, rating, img } = req.body;

		pool.query(
			queries.createProduct,
			[product, price, rating, img],
			(error, results) => {
				if (error) throw error;
				res.status(200).send("Product published successfully");
			}
		);
	} else {
		res.status(403).send("You are not allow to do this!");
	}
};

module.exports = {
	getProducts,
	getProductById,
	createProduct,
};
