const models = require("../database/models");

module.exports = {
  //Get all the ShopProducts
  getShopProducts: async (req, res) => {
    try {
      const shopProducts = await models.shop_products.findAll();
      res.json(shopProducts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Get one ShopProducts by id
  getShopProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const shopProducts = await models.shop_products.findOne({
        where: {
          id,
        },
      });
      if (!shopProducts) {
        return res.status(404).json({ message: "Product does not exists" });
      }
      res.json(shopProducts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Create a new ShopProducts
  createShopProducts: async (req, res) => {
    try {
      const { name, price, shopId } = req.body;

      //Validation if shop not exists

      const shop = await models.shop.findByPk(shopId);
      if (!shop) {
        return res.status(404).json({ message: "Shop does not exists" });
      }
      const newShopProducts = await models.shop_products.create({
        name,
        price,
        shopId,
      });
      res.json(newShopProducts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Update a ShopProducts
  updateShopProducts: async (req, res) => {
    try {
      const { id } = req.params;

      const shopProducts = await models.shop_products.findByPk(id);
      if (!shopProducts) {
        return res.status(404).json({ message: "Product does not exists" });
      }
      shopProducts.set(req.body);
      console.log(shopProducts);
      await shopProducts.save();

      return res.json(shopProducts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Delete using a logical variable
  deleteShopProducts: async (req, res) => {
    try {
      const { id } = req.params;

      const shopProducts = await models.shop_products.findByPk(id);
      if (!shopProducts) {
        return res.status(404).json({ message: "Product does not exists" });
      }
      shopProducts.isDelete = true;
      await shopProducts.save();
      console.log(shopProducts);

      res.json(shopProducts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
