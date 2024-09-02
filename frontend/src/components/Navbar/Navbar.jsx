import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

const Navbar = () => {
	const { isAuthenticated, logout, sessionData } = useContext(AuthContext);
	const { cartProducts } = useContext(CartContext);
	console.log(cartProducts);
	const numOfProducts = cartProducts.length || 0;

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
								<Link className="link cart" to="/">
									Cart {numOfProducts}
								</Link>
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
		</div>
	);
};

export default Navbar;
