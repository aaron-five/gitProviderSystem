const router = require("express").Router();
const shopController = require("../controllers/shop.controller");

router.get("/", shopController.getShops);
router.get("/:id", shopController.getShop);
router.post("/", shopController.createShop);
router.put("/edit/:id", shopController.updateShop);
router.delete("/delete/:id", shopController.deleteShop);
router.get("/:id/products", shopController.getShopAndProducts);

module.exports = router;
