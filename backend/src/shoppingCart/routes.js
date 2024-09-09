const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.post("/", controller.addToCart);

router.post("/getproducts", controller.getProductsStored);
router.post("/get-product-with-id", controller.getProductStoredWithId);

router.post("/gettotal", controller.getTotalInCart);

router.post("/checkout", controller.buyItemsInCart);

router.delete("/delete", controller.deleteFromCart);

module.exports = router;
