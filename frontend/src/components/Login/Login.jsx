import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Login.css";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ message: "" });
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		setLoading(true);
		setError({ message: "" });

		try {
			const res = await axios.post(
				"http://localhost:8000/api/users/login",
				data,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			// If the user can't log in, throw new error
			const responseData = res.data;
			if (responseData.username && responseData.username.length > 0) {
				console.log(responseData);
				navigate("/");
			} else {
				setError({ message: "Something went wrong during the log in" });
				throw new Error("Login failed");
			}
		} catch (error) {
			setError({ message: "The username or the password is incorrect" });
			console.error("Error during login:", error.message);
		}

		setLoading(false);
	};

	return (
		<div className="login">
			<form className="login__form" onSubmit={handleSubmit(onSubmit)}>
				<h2>Log in to your account</h2>
				<div className="login__form-input">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						id="usernameInput"
						placeholder="Username"
						{...register("username", {
							required: "Username is required",
							minLength: {
								value: 2,
								message: "Username must be at least 2 characters long",
							},
						})}
					/>
					{errors.username && (
						<p className="error__message">{errors.username.message}</p>
					)}
				</div>
				<div className="login__form-input">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						id="passwordInput"
						placeholder="Password"
						{...register("password", {
							required: "Password is required",
							minLength: {
								value: 4,
								message: "Username must be at least 4 characters long",
							},
						})}
					/>
					{errors.password && (
						<p className="error__message">{errors.password.message}</p>
					)}
				</div>
				{error.message && <p className="error__message">{error.message}</p>}
				<input
					type="submit"
					value="Log in"
					className="login__form-btn"
					disabled={loading}
				/>
				<p>
					Don't Have an account? <Link to="/register">Create one here</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
