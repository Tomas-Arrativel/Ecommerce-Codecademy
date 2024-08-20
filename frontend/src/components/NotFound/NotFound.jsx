import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div>
			<h2>Page not found 😟</h2>
			<Link to="/">Go to the Home</Link>
		</div>
	);
};

export default NotFound;
