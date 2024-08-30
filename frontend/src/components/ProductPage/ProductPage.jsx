import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Quantity from "../Quantity/Quantity";
import { useForm } from "react-hook-form";

import axios from "axios";

import "./ProductPage.css";

const ProductPage = () => {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const { handleSubmit } = useForm();
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

	const onSubmit = async (data) => {
		console.log(
			`${quantity} product with id ${productId} added successfully to the cart!`
		);
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

							<form
								className="product_page-addto"
								onSubmit={handleSubmit(onSubmit)}
							>
								<button type="submit" className="product_page-btn">
									Add to cart
								</button>
								<Quantity quantity={quantity} setQuantity={setQuantity} />
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductPage;
