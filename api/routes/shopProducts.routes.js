const router = require("express").Router();
const shopProductsController = require("../controllers/shopProducts.controller");

router.get("/", shopProductsController.getShopProducts);
router.get("/:id", shopProductsController.getShopProduct);
router.post("/", shopProductsController.createShopProducts);
router.put("/edit/:id", shopProductsController.updateShopProducts);
router.delete("/delete/:id", shopProductsController.deleteShopProducts);

module.exports = router;
