const express = require("express");
const usersRoutes = require("./src/users/routes");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
	res.send("Hello world");
});

app.use("/api/users", usersRoutes);

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
