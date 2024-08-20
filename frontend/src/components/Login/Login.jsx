import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="login">
			<form className="login__form" action="">
				<h2>Log in to your account</h2>
				<div className="login__form-input">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						id="usernameInput"
						placeholder="Username"
					/>
				</div>
				<div className="login__form-input">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						id="passwordInput"
						placeholder="Password"
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
