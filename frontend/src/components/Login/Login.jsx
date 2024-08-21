import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ message: "" });

	const navigate = useNavigate();

	const onSubmit = async (e) => {
		setLoading(true);
		setError(false);
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:8000/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			// If the user can't log in, throw new error
			if (!res.ok) {
				setError({ message: "Something went wrong during the log in" });
				throw new Error("Login failed");
			}

			const data = await res.json();

			navigate("/");
		} catch (error) {
			setError({ error: true, message: error.message });
			console.error("Error during login:", error.message);
		}
	};

	return (
		<div className="login">
			<form className="login__form" onSubmit={onSubmit}>
				<h2>Log in to your account</h2>
				<div className="login__form-input">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						id="usernameInput"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="login__form-input">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						id="passwordInput"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<input type="submit" value="Log in" className="login__form-btn" />
				<p>
					Don't Have an account? <Link to="/register">Create one here</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
