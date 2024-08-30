import React from "react";

const Quantity = ({ quantity, setQuantity }) => {
	const increaseQuantity = () => {
		setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10)); // Increase quantity but not above 10
	};

	const decreaseQuantity = () => {
		setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Decrease quantity but not below 1
	};

	return (
		<div className="quantity_selector">
			<button
				type="button"
				className="quantity_button"
				onClick={decreaseQuantity}
				disabled={quantity === 1}
			>
				-
			</button>
			<input value={quantity} className="quantity_display" readOnly />
			<button
				type="button"
				className="quantity_button"
				onClick={increaseQuantity}
				disabled={quantity === 10}
			>
				+
			</button>
		</div>
	);
};

export default Quantity;
