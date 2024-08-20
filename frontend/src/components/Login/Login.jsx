import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="login">
			<form className="login__form" action="">
				<h2>Log in to your account</h2>
				<input
					type="text"
					name="username"
					id="usernameInput"
					placeholder="Type your username"
				/>
				<input
					type="password"
					name="password"
					id="passwordInput"
					placeholder="Type your password"
				/>
				<input type="submit" value="Log in" className="login__form-btn" />
				<p>
					Don't Have an account? <Link to="/register">Create one here</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
