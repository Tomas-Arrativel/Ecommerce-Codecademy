import React, { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/CartContext";

import "./CartProduct.css";

const CartProduct = ({ name, img, price, quantity, id, cartId }) => {
	const { deleteProductFromCart, cartProducts, updateCart } =
		useContext(CartContext);

	const priceString = price; // Example price string
	const priceNumeric = parseFloat(
		priceString.replace(/[^0-9,-]+/g, "").replace(",", ".")
	);
	const totalPrice = priceNumeric * quantity;

	const onClick = async () => {
		await deleteProductFromCart(id);
		await updateCart();
	};

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
					<button onClick={onClick} className="remove__btn-cart" type="button">
						Remove from cart
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartProduct;
