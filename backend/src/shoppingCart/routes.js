const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getProductsStored);
router.post("/", controller.addToCart);

router.get("/checkout", controller.buyItemsInCart);

router.delete("/:productId", controller.deleteFromCart);

module.exports = router;
