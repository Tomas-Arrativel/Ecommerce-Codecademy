const express = require("express");
const ecomRoutes = require("./routes/index");

const app = express();

app.get("/", (req, res, next) => {
	res.send("Hello world");
});

app.use("/api/ecommerce", ecomRoutes);

const PORT = 8000;
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});
