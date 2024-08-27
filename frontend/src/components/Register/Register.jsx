import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./Register.css";

const Register = () => {
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
			const res = await axios.post("http://localhost:8000/api/users", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			const responseData = res.data;
			if (!responseData.error) {
				navigate("/login");
			} else {
				setError({ message: "Something went wrong during the registration" });
				throw new Error("Registration failed");
			}
		} catch (error) {
			setError({ message: "The username already exists" });
			console.error("Error during registration:", error.message);
		}

		setLoading(false);
	};

	return (
		<div className="register">
			<form className="register__form" onSubmit={handleSubmit(onSubmit)}>
				<h2>Create an account account</h2>
				<div className="register__form-input">
					<label htmlFor="first_name">First name:</label>
					<input
						type="text"
						name="first_name"
						id="firstNameInput"
						placeholder="First name"
						{...register("first_name", {
							required: "First name is required",
							minLength: {
								value: 2,
								message: "First name must be at least 2 characters long",
							},
						})}
					/>
					{errors.first_name && (
						<p className="error__message">{errors.first_name.message}</p>
					)}
				</div>
				<div className="register__form-input">
					<label htmlFor="last_name">Last name:</label>
					<input
						type="text"
						name="last_name"
						id="lastNameInput"
						placeholder="Last name"
						{...register("last_name", {
							required: "Last name is required",
							minLength: {
								value: 2,
								message: "Last name must be at least 2 characters long",
							},
						})}
					/>
					{errors.last_name && (
						<p className="error__message">{errors.last_name.message}</p>
					)}
				</div>
				<div className="register__form-input">
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
				<div className="register__form-input">
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

				<input type="submit" value="Register" className="register__form-btn" />
				<p>
					Already Have an account? <Link to="/login">Log in here</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
