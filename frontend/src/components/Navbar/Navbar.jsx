import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
	const { isAuthenticated, logout, sessionData } = useContext(AuthContext);

	return (
		<nav>
			<Link to="/">
				<h2>MyEcom</h2>
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
								Cart
							</Link>
						</li>
						<li>
							<Link className="link" to="/">
								Orders
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
	);
};

export default Navbar;
