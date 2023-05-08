const router = require("express").Router();

const shopRoutes = require("./shop.routes");
const shopProductRoutes = require("./shopProducts.routes");
const providerRoutes = require("./provider.routes");
const shopBuysRoutes = require("./shopBuys.routes");

const routes_init = () => {
  router.use("/shop", shopRoutes);
  router.use("/shop-products", shopProductRoutes);
  router.use("/provider", providerRoutes);
  router.use("/shop-buys", shopBuysRoutes);
  return router;
};
module.exports = { routes_init };
