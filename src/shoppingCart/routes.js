const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getProductsStored);
router.post("/", controller.addToCart);

module.exports = router;
