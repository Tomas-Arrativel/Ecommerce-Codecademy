const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.addToCart);

router.post("/getproducts", controller.getProductsStored);
router.post("/get-product-with-id", controller.getProductStoredWithId);

router.get("/checkout", controller.buyItemsInCart);

router.post("/delete", controller.deleteFromCart);

module.exports = router;
