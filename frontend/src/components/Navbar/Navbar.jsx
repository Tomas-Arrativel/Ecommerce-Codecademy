import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import CartProduct from "../CartProduct/CartProduct";

const Navbar = () => {
	const { isAuthenticated, logout, sessionData } = useContext(AuthContext);
	const {
		cartProducts,
		deleteProductFromCart,
		updateCart,
		totalPrice,
		buyFromCart,
	} = useContext(CartContext);

	const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const numOfProducts = cartProducts.length || 0;

	const toggleOffCanvas = () => {
		setIsOffCanvasOpen(!isOffCanvasOpen);
	};

	const closeOffCanvas = () => {
		setIsOffCanvasOpen(false);
	};

	// Handle delete product from cart
	const handleDelete = async (productId) => {
		await deleteProductFromCart(productId);
		updateCart(); // Fetch the updated cart
	};

	const handleBuyOnClick = async () => {
		setLoading(true);
		await buyFromCart();
		setLoading(false);
	};

	return (
		<div>
			<nav>
				<Link to="/">
					<h1>MyEcom</h1>
				</Link>
				<ul>
					<li>
						<Link className="link" to="/catalog">
							Catalog
						</Link>
					</li>
					{isAuthenticated ? (
						<>
							<li>
								<Link className="link" to="/orders">
									Orders
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
					{totalPrice != 0 ? (
						<>
							<div className="cart__products-container">
								{cartProducts.map((product) => (
									<div key={product.product_id} className="cart__product-item">
										<CartProduct
											name={product.product}
											img={product.img}
											price={product.price}
											quantity={product.quantity}
											id={product.id}
											cartId={product.cart_id}
											deleteButton={
												<button
													className="remove__btn-cart"
													onClick={() => handleDelete(product.product_id)}
												>
													Delete
												</button>
											}
										/>
									</div>
								))}
							</div>
							<button
								onClick={handleBuyOnClick}
								className="buy__btn-cart"
								disabled={loading}
							>
								Buy products <span>{totalPrice}</span>
							</button>
						</>
					) : (
						<p className="emptycart__message">
							You don't have nothing in your cart, add items to buy!
						</p>
					)}
				</div>
			</div>

			{isOffCanvasOpen && (
				<div className="overlay" onClick={closeOffCanvas}></div>
			)}
		</div>
	);
};

export default Navbar;
