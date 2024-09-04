import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import CartProduct from "../CartProduct/CartProduct";

const Navbar = () => {
	const { isAuthenticated, logout, sessionData } = useContext(AuthContext);
	const { cartProducts } = useContext(CartContext);
	const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

	const numOfProducts = cartProducts.length || 0;

	const toggleOffCanvas = () => {
		setIsOffCanvasOpen(!isOffCanvasOpen);
	};

	const closeOffCanvas = () => {
		setIsOffCanvasOpen(false);
	};

	return (
		<div>
			<nav>
				<Link to="/">
					<h1>MyEcom</h1>
				</Link>
				<ul>
					<li>
						<Link className="link" to="/catalogs">
							Catalogs
						</Link>
					</li>
					{isAuthenticated ? (
						<>
							<li>
								<Link className="link" to="/">
									Orders
								</Link>
							</li>
							<li>
								<Link className="link" to="/">
									Favorites
								</Link>
							</li>
							<li>
								<button className="link cart-button" onClick={toggleOffCanvas}>
									Cart {numOfProducts}
								</button>
							</li>
							<li>
								<button className="link logout" onClick={logout}>
									Logout
								</button>
							</li>
							<li>{sessionData.username}</li>
						</>
					) : (
						<li>
							<Link className="link loginbtn" to="/login">
								Login
							</Link>
						</li>
					)}
				</ul>
			</nav>
			<Outlet />

			<div className={`offcanvas ${isOffCanvasOpen ? "open" : ""}`}>
				<div className="offcanvas-content">
					<button className="close-btn" onClick={closeOffCanvas}>
						&times;
					</button>
					<h2>Your Cart {sessionData.username}</h2>
					<div className="cart__products-container">
						{cartProducts.map((product) => (
							<CartProduct
								name={product.product}
								img={product.img}
								price={product.price}
								quantity={product.quantity}
								id={product.id}
								cartId={product.cart_id}
								key={product.product_id}
							/>
						))}
					</div>
				</div>
			</div>

			{isOffCanvasOpen && (
				<div className="overlay" onClick={closeOffCanvas}></div>
			)}
		</div>
	);
};

export default Navbar;
