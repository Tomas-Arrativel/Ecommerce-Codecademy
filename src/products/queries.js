// GETS
const getProducts = "SELECT * FROM products LIMIT 25";
const getProductById = "SELECT * FROM products WHERE id = $1";

// POSTS
const createProduct =
	"INSERT INTO products (product, price, rating, img) VALUES ($1, $2, $3, $4)";

// DELETES
const deleteProduct = "DELETE FROM products WHERE id = $1";

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	deleteProduct,
};
