const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getProducts);
router.post("/", controller.createProduct);

router.get("/:id", controller.getProductById);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
