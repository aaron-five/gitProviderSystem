const router = require("express").Router();
const providerController = require("../controllers/provider.controller");

router.get("/", providerController.getProviders);
router.get("/:id", providerController.getProvider);
router.post("/", providerController.createProvider);
router.put("/edit/:id", providerController.updateProvider);
router.delete("/delete/:id", providerController.deleteProvider);

module.exports = router;
