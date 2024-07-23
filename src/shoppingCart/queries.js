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
const AddToCart = "INSERT INTO shopping_cart VALUES ($1, $2, $3)";

// DELETES
const deleteFromCart =
	"DELETE FROM shopping_cart WHERE user_id = $1 AND product_id = $2";

module.exports = {
	getProductsStored,
	AddToCart,
	deleteFromCart,
};
