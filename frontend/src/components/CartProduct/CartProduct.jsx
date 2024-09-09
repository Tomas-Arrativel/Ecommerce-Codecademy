import React from "react";

import "./CartProduct.css";

const CartProduct = ({
	name,
	img,
	price,
	quantity,
	id,
	cartId,
	deleteButton,
}) => {
	const priceString = price; // Example price string
	const priceNumeric = parseFloat(
		priceString.replace(/[^0-9,-]+/g, "").replace(",", ".")
	);
	const totalPrice = priceNumeric * quantity;

	return (
		<div className="product__cart">
			<img src={img} alt={`product-${id}`} />
			<div className="product__cart-detail">
				<div>
					<h3>{name}</h3>
					<p>
						{price} <span>x</span> {quantity}
					</p>
				</div>
				<div className="product__cart-final">
					<h4>$ {totalPrice}</h4>
					{deleteButton}
				</div>
			</div>
		</div>
	);
};

export default CartProduct;
