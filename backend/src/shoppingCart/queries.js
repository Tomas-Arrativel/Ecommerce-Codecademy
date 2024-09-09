// GETS
const getProductsStored = `SELECT u.username AS user,
                           p.product AS product, 
                           p.price AS price, 
                           s.quantity AS quantity,
                           p.id AS product_id,
                           p.img AS img,
                           s.id as cart_id
                           FROM shopping_cart s 
                           JOIN users u 
                              ON u.id = s.user_id
                           JOIN products p
                              ON p.id = s.product_id
                           WHERE s.user_id = $1`;

const getProductAddedToCart = `SELECT u.username AS user,
                              p.product AS product, 
                              p.price AS price, 
                              s.quantity AS quantity,
                              p.id AS product_id 
                              FROM shopping_cart s 
                              JOIN users u 
                                 ON u.id = s.user_id
                              JOIN products p
                                 ON p.id = s.product_id
                              WHERE s.user_id = $1
                              AND p.id = $2
                              ORDER BY s.id desc
                              LIMIT 1`;

const getTotalInCart = `SELECT SUM(p.price * s.quantity) AS total_price
                        FROM shopping_cart s
                        JOIN products p ON s.product_id = p.id
                        WHERE s.user_id = $1`;

// INSERTS
const addToCart =
	"INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES ($1, $2, $3)";
const newOrder =
	"INSERT INTO orders (user_id, total_price, date) VALUES ($1, $2, NOW())";

// DELETES
const deleteFromCart =
	"DELETE FROM shopping_cart WHERE user_id = $1 AND product_id = $2";
const deleteCartWhenBuying = "DELETE FROM shopping_cart WHERE user_id = $1";

module.exports = {
	getProductsStored,
	getProductAddedToCart,
	getTotalInCart,
	addToCart,
	newOrder,
	deleteFromCart,
	deleteCartWhenBuying,
};
