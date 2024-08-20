import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./components/Login/Login.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <NotFound />,
	},
	{
		path: "/login",
		element: <Login />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
