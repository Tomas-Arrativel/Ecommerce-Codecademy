import React, { useEffect, useState } from "react";
import "./Catalog.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Catalog = () => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		try {
			const response = await axios.get("http://localhost:8000/api/catalog");
			setCategories(response.data);
		} catch (error) {
			console.error("Error fetching categories:", error);
		}
	};

	return (
		<div className="catalog">
			<h2>Catalog</h2>

			{/* Display categories as links */}
			<div className="categories">
				{categories.map((category) => (
					<Link
						key={category.category}
						to={`/?cat=${category.category}`} // Create a link with the query parameter
						className="category-link"
					>
						{category.category}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Catalog;
