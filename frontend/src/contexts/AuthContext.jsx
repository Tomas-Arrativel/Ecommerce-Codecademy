import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
				toast("Good byee!", {
					position: "top-center",
					autoClose: 2500,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
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
			<ToastContainer
				position="top-center"
				autoClose={4000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="colored"
			/>
		</AuthContext.Provider>
	);
};
