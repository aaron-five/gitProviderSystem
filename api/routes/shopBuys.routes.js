const router = require("express").Router();
const shopBuysController = require("../controllers/shopBuy.Controller");

router.get("/", shopBuysController.getShopBuys);
router.get("/:id", shopBuysController.getShopBuy);
router.post("/", shopBuysController.createShopBuys);
router.put("/edit/:id", shopBuysController.updateShopBuys);
router.delete("/delete/:id", shopBuysController.deleteShopBuys);
router.get("/:id/detail", shopBuysController.getShopBuyDetailByShopBuyId);
module.exports = router;
