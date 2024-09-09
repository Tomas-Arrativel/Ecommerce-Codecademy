const pool = require("../../db");
const queries = require("./queries");

const getProductsStored = (req, res) => {
	const userId = req.body.userId;

	if (userId) {
		pool.query(queries.getProductsStored, [userId], (error, results) => {
			if (error) throw error;
			res.status(200).send(results.rows);
		});
	} else {
		res.status(403).send("You have to log in to access your cart");
	}
};

const getProductStoredWithId = (req, res) => {
	const { userId, productId } = req.body;

	if (userId) {
		pool.query(
			queries.getProductAddedToCart,
			[userId, productId],
			(error, results) => {
				if (error) throw error;
				res.status(200).send(results.rows);
			}
		);
	} else {
		res.status(403).send("You have to log in to access your cart");
	}
};

const addToCart = (req, res) => {
	const { productId, quantity, userId } = req.body;

	if (userId) {
		pool.query(
			queries.addToCart,
			[userId, productId, quantity],
			(error, results) => {
				if (error) throw error;
				res.status(200).send("Product added to cart successfully");
			}
		);
	} else {
		res.status(403).send("You need to log in to add product to the cart");
	}
};

const deleteFromCart = (req, res) => {
	const { productId, userId } = req.body;

	if (userId) {
		pool.query(
			queries.deleteFromCart,
			[userId, productId],
			(error, results) => {
				if (error) throw error;
				res.status(200).send("Product deleted from cart successfully");
			}
		);
	} else {
		res
			.status(403)
			.send("You need to log in to delete a product from the cart");
	}
};

const getTotalInCart = (req, res) => {
	const { userId } = req.body;

	if (userId) {
		pool.query(queries.getTotalInCart, [userId], (error, results) => {
			if (error) throw error;
			res.send(results.rows[0]);
		});
	}
};

const buyItemsInCart = (req, res) => {
	const { userId } = req.body;

	if (userId) {
		// If the user is logged in, get the products in cart
		pool.query(queries.getProductsStored, [userId], (error, results) => {
			if (error) throw error;
			if (results.rows.length >= 1) {
				let totalPrice = 0;

				// Loop through the products and make a totalPrice variable
				results.rows.forEach((product) => {
					const newNumber =
						parseInt(product.price.replace("$ ", "").replace(".", "")) *
						product.quantity;
					totalPrice += newNumber;
				});

				//If all the data is correct, the user will proceed to do the payment
				pool.query(queries.deleteCartWhenBuying, [userId], (error, results) => {
					if (error) throw error;
					// Insert the totalprice and the userid into orders if they exist
					pool.query(
						queries.newOrder,
						[userId, totalPrice],
						(error, results) => {
							if (error) throw error;
							res
								.status(201)
								.send(
									"Congrats! Shopping cart bought successfully! the order is now available"
								);
						}
					);
				});
			} else {
				res.send("This user does not have any product added to the cart");
			}
		});
	} else {
		res.status(403).send("You need to log in to buy the products on the cart");
	}
};

module.exports = {
	getProductsStored,
	getProductStoredWithId,
	getTotalInCart,
	addToCart,
	deleteFromCart,
	buyItemsInCart,
};
