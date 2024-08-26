const express = require("express");
require("dotenv").config();
const session = require("express-session");
const cors = require("cors");
const usersRoutes = require("./src/users/routes");
const productsRoutes = require("./src/products/routes");
const shoppingCartRoutes = require("./src/shoppingCart/routes");

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_KEY,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false, // Set to true if using HTTPS
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
	})
);

app.get("/", (req, res, next) => {
	res.send("Hello world");
});

app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", shoppingCartRoutes);

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
