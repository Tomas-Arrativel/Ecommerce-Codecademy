import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Product from "./components/Product/Product";
import axios from "axios";

function App() {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get("http://localhost:8000/api/products/");
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
