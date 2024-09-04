import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Quantity from "../Quantity/Quantity";
import { useForm } from "react-hook-form";

import axios from "axios";

import "./ProductPage.css";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

const ProductPage = () => {
	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [productQuantityCart, setProductQuantityCart] = useState(0);

	const { sessionData } = useContext(AuthContext);
	const { updateCart, cartProducts, deleteProductFromCart, addProductToCart } =
		useContext(CartContext);

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

		// Update productQuantityCart based on the cartProducts whenever it changes
		const productInCart = cartProducts.find(
			(prod) => prod.product_id == productId
		);
		setProductQuantityCart(productInCart ? productInCart.quantity : 0);
	}, [cartProducts]);

	const onSubmit = async (data) => {
		setLoading(true);
		setErrorMsg("");

		try {
			await addProductToCart(productId, quantity);
		} catch (error) {
			setErrorMsg("You need to log in to add product to the cart");
			console.error(errorMsg);
		}

		setLoading(false);
	};

	const onSubmitDelete = async (data) => {
		setLoading(true);
		await deleteProductFromCart(productId);
		setLoading(false);
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

							{productQuantityCart > 0 ? (
								<form
									className="product_page-addto"
									onSubmit={handleSubmit(onSubmitDelete)}
								>
									<button
										type="submit"
										className="product_page-btn delete_cart-product"
									>
										Delete {productQuantityCart} from cart
									</button>
								</form>
							) : (
								<form
									className="product_page-addto"
									onSubmit={handleSubmit(onSubmit)}
								>
									<button type="submit" className="product_page-btn">
										Add to cart
									</button>
									<Quantity quantity={quantity} setQuantity={setQuantity} />
								</form>
							)}
							<p className="error__message">{errorMsg}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductPage;
