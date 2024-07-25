const pool = require("../../db");
const queries = require("./queries");

const getProductsStored = (req, res) => {
	const userId = req.session.userId;

	if (userId) {
		pool.query(queries.getProductsStored, [userId], (error, results) => {
			if (error) throw error;
			res.status(200).send(results.rows);
		});
	} else {
		res.status(403).send("You have to log in to access your cart");
	}
};

const addToCart = (req, res) => {
	const userId = req.session.userId;
	const { productId, quantity } = req.body;

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
	const userId = req.session.userId;
	const productId = req.params.productId;

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

const buyItemsInCart = (req, res) => {
	const userId = req.session.userId;

	if (userId) {
		pool.query(queries.getProductsStored, [userId], (error, results) => {
			if (error) throw error;
			if (results.rows.length >= 1) {
				let totalPrice = 0;

				results.rows.forEach((product) => {
					const newNumber =
						parseInt(product.price.replace("$ ", "").replace(".", "")) *
						product.quantity;
					totalPrice += newNumber;
				});

				// Insert the totalprice and the userid into orders if they exist
				pool.query(queries.newOrder, [userId, totalPrice], (error, results) => {
					if (error) throw error;
					res.status(201).send("Order uploaded successfully");
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
	addToCart,
	deleteFromCart,
	buyItemsInCart,
};
