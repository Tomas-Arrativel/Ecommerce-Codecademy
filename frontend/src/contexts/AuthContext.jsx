import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [sessionData, setSessionData] = useState({});

	useEffect(() => {
		// Check if the user is authenticated on mount
		axios
			.get("http://localhost:8000/api/users/check-auth", {
				withCredentials: true,
			})
			.then((response) => {
				if (response.data.isAuthenticated) {
					setIsAuthenticated(true);
				}
			})
			.catch((error) => {
				console.error("Error checking auth", error);
			});
	}, []);

	const logout = () => {
		axios
			.post(
				"http://localhost:8000/api/users/logout",
				{},
				{ withCredentials: true }
			)
			.then(() => {
				setIsAuthenticated(false);
			})
			.catch((error) => {
				console.error("Logout failed", error);
			});
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				logout,
				sessionData,
				setSessionData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
