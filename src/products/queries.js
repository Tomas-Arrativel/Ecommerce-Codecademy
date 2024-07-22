// GETS
const getProducts = "SELECT * FROM products LIMIT 25";
const getProductById = "SELECT * FROM products WHERE id = $1";

module.exports = {
	getProducts,
	getProductById,
};
