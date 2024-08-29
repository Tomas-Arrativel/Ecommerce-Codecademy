import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./ProductPage.css";

const ProductPage = () => {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const { productId } = useParams();

	useEffect(() => {
		const getProductById = async () => {
			try {
				setLoading(true);
				const response = await axios.get(
					`http://localhost:8000/api/products/${productId}`
				);
				setProduct(response.data[0]);
				setLoading(false);
			} catch (error) {
				console.error("Error geting the product: ", error);
			}
		};

		getProductById();
	}, []);

	const increaseQuantity = () => {
		setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10)); // Increase quantity but not above 10
	};

	const decreaseQuantity = () => {
		setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1)); // Decrease quantity but not below 1
	};

	return (
		<div className="product_page">
			{loading ? (
				<div className="product_page-loading">Loading... please wait</div>
			) : (
				<div className="product_page-container">
					<img src={product.img} alt={`${product.product} ${product.id}`} />
					<div className="product_page-detail">
						<div>
							<h3 className="detail_name">{product.product}</h3>
							<span className="detail_category">{product.category}</span>
							<p className="detail_description">{product.description}</p>
						</div>
						<div>
							<div className="detail_info-numbers">
								<span className="detail_rating">{product.rating}/5 ⭐</span>
								<span className="detail_price">{product.price}</span>
							</div>

							<div className="product_page-addto">
								<button className="product_page-btn">Add to cart</button>
								<div className="quantity_selector">
									<button
										className="quantity_button"
										onClick={decreaseQuantity}
										disabled={quantity === 1}
									>
										-
									</button>
									<span className="quantity_display">{quantity}</span>
									<button
										className="quantity_button"
										onClick={increaseQuantity}
										disabled={quantity === 10}
									>
										+
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductPage;
