import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const { sessionData } = useContext(AuthContext); // Get sessionData from AuthContext
	const [cartProducts, setCartProducts] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		if (sessionData?.userId) {
			fetchCartProducts(); // Initial fetch
			getTotalInCart();
		}
	}, [sessionData?.userId]); // Re-fetch when userId changes

	const updateCart = async () => {
		await fetchCartProducts(); // Re-fetch cart data
		await getTotalInCart();
	};

	const fetchCartProducts = async () => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/cart/getproducts",
				{ userId: sessionData.userId }
			);
			setCartProducts(response.data);
		} catch (error) {
			console.error("Error fetching cart products: ", error);
		}
	};

	const getTotalInCart = async () => {
		try {
			const response = await axios.post(
				"http://localhost:8000/api/cart/gettotal",
				{ userId: sessionData.userId },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			if (response.data.total_price != null)
				setTotalPrice(response.data.total_price);
			else setTotalPrice(0);
		} catch (error) {
			console.error("Error getting total price in cart: ", error);
		}
	};

	const addProductToCart = async (productId, quantity) => {
		if (sessionData?.userId) {
			const res = await axios.post(
				"http://localhost:8000/api/cart/",
				{ productId, quantity, userId: sessionData.userId },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (res.status === 200) {
				// Call context function to refresh cart data
				updateCart();
			}
		} else {
			// If the user can't add to cart, throw new error
			throw new Error("Error while adding product to the cart");
		}
	};

	const deleteProductFromCart = async (productId) => {
		if (window.confirm("Do you want to delete this product from the cart?")) {
			try {
				await axios.delete("http://localhost:8000/api/cart/delete", {
					data: {
						userId: sessionData.userId,
						productId,
					},
					headers: {
						"Content-Type": "application/json",
					},
				});
				// Call context function to refresh cart data
				updateCart();
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<CartContext.Provider
			value={{
				cartProducts,
				updateCart,
				deleteProductFromCart,
				addProductToCart,
				totalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
