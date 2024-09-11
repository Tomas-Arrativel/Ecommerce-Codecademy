import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./components/Login/Login.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import Register from "./components/Register/Register.jsx";
import ProductPage from "./components/ProductPage/ProductPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import OrdersPage from "./components/OrdersPage/OrdersPage.jsx";

import "./index.css";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { OrdersProvider } from "./contexts/OrdersContext.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navbar />,
		errorElement: <NotFound />,
		children: [
			{
				path: "/",
				element: <App />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/orders",
				element: (
					<OrdersProvider>
						<OrdersPage />
					</OrdersProvider>
				),
			},
			{
				path: "/products/:productId",
				element: <ProductPage />,
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthProvider>
			<CartProvider>
				<RouterProvider router={router} />
			</CartProvider>
		</AuthProvider>
	</StrictMode>
);
