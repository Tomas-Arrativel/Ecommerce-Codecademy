import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
	return (
		<div className="register">
			<form className="register__form" action="">
				<h2>Create an account account</h2>
				<div className="register__form-input">
					<label htmlFor="FirstName">First name:</label>
					<input
						type="text"
						name="FirstName"
						id="FirstNameInput"
						placeholder="First name"
					/>
				</div>
				<div className="register__form-input">
					<label htmlFor="LastName">Last name:</label>
					<input
						type="text"
						name="LastName"
						id="LastNameInput"
						placeholder="Last name"
					/>
				</div>
				<div className="register__form-input">
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						name="username"
						id="usernameInput"
						placeholder="Username"
					/>
				</div>
				<div className="register__form-input">
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						name="password"
						id="passwordInput"
						placeholder="Password"
					/>
				</div>
				<input type="submit" value="Register" className="register__form-btn" />
				<p>
					Already Have an account? <Link to="/login">Log in here</Link>
				</p>
			</form>
		</div>
	);
};

export default Register;
