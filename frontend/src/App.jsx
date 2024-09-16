import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";
import axios from "axios";
import { useLocation } from "react-router-dom";

function App() {
	const [products, setProducts] = useState([]);

	const location = useLocation(); // Get the location object

	// Helper function to get the 'cat' query parameter from the URL
	const getCategoryFromUrl = () => {
		const params = new URLSearchParams(location.search);
		return params.get("cat");
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				// Construct the URL with or without the `cat` query parameter
				const category = getCategoryFromUrl();
				const url = category
					? `http://localhost:8000/api/products?cat=${category}`
					: "http://localhost:8000/api/products";

				const response = await axios.get(url);
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching products:", error);
			}
		};

		fetchProducts();
	}, []);
	return (
		<div>
			<Navbar />
			<div className="home">
				<div className="home_background">
					<h2>Where you can turn dreams into reality</h2>
				</div>
				<div className="home_products">
					<div className="home_products-container">
						{products.map((product) => (
							<Product
								name={product.product}
								price={product.price}
								rating={product.rating}
								img={product.img}
								id={product.id}
								key={product.id}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
