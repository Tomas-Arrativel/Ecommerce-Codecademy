// GETS
const getProductsStored = `SELECT u.username AS user,
                           p.product AS product, 
                           p.price AS price, 
                           s.quantity AS quantity 
                           FROM shopping_cart s 
                           JOIN users u 
                              ON u.id = s.user_id
                           JOIN products p
                              ON p.id = s.product_id
                           WHERE s.user_id = $1`;

// INSERTS
const addToCart = "INSERT INTO shopping_cart VALUES ($1, $2, $3)";
const newOrder =
	"INSERT INTO orders (user_id, total_price, date) VALUES ($1, $2, NOW())";

// DELETES
const deleteFromCart =
	"DELETE FROM shopping_cart WHERE user_id = $1 AND product_id = $2";
const deleteCartWhenBuying = "DELETE FROM shopping_cart WHERE user_id = $1";

module.exports = {
	getProductsStored,
	addToCart,
	newOrder,
	deleteFromCart,
	deleteCartWhenBuying,
};
