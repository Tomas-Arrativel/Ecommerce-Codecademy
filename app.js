const express = require("express");
require("dotenv").config();
const session = require("express-session");
const usersRoutes = require("./src/users/routes");

const app = express();

const getSecret = () => {
	// Logic to get the secret
	return process.env.SESSION_KEY;
};

app.use(express.json());
app.use(
	session({
		secret: getSecret(),
		resave: false,
		saveUninitialized: false,
	})
);

app.get("/", (req, res, next) => {
	res.send("Hello world");
});

app.use("/api/users", usersRoutes);

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
