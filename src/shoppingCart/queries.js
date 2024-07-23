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

module.exports = {
	getProductsStored,
};
