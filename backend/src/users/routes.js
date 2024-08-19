const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getUsers);
router.post("/", controller.createUser);

router.get("/:id", controller.getUserById);
router.delete("/:id", controller.deleteUser);

router.post("/login", controller.LogUser);

module.exports = router;
