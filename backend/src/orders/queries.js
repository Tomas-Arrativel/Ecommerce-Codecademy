const getOrders = `SELECT * FROM orders
                  WHERE user_id = $1
                  ORDER BY order_id DESC`;

module.exports = {
	getOrders,
};
