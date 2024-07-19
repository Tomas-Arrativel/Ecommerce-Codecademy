const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
	res.send("Sending api data");
});

module.exports = router;
