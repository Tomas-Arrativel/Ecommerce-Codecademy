import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
	const { sessionData } = useContext(AuthContext); // Get sessionData from AuthContext
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (sessionData?.userId) {
			fetchOrders();
		}
	}, [sessionData?.userId]);

	const fetchOrders = async () => {
		try {
			setLoading(true);
			const response = await axios.post("http://localhost:8000/api/orders", {
				userId: sessionData?.userId,
			});

			setOrders(response.data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching orders: ", error);
		}
	};

	return (
		<OrdersContext.Provider value={{ orders, loading }}>
			{children}
		</OrdersContext.Provider>
	);
};
