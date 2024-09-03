import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // Adjust the path as needed

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const { sessionData } = useContext(AuthContext); // Get sessionData from AuthContext
	const [cartProducts, setCartProducts] = useState([]);

	useEffect(() => {
		if (sessionData?.userId) {
			fetchCartProducts(); // Initial fetch
		}
	}, [sessionData?.userId]); // Re-fetch when userId changes

	const updateCart = async () => {
		await fetchCartProducts(); // Re-fetch cart data
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

	return (
		<CartContext.Provider value={{ cartProducts, updateCart }}>
			{children}
		</CartContext.Provider>
	);
};
