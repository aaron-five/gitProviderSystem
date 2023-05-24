const models = require("../database/models");

module.exports = {
  getShops: async (req, res) => {
    try {
      const shops = await models.shop.findAll();
      if (!shops) {
        return res.status(404).json({ message: "Shop does not exists" });
      }
      res.json(shops);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Get one shop by id
  getShop: async (req, res) => {
    try {
      const { id } = req.params;
      const shop = await models.shop.findOne({
        where: {
          id,
        },
      });
      if (!shop) {
        return res.status(404).json({ message: "Shop does not exists" });
      }
      res.json(shop);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Create a new Shop
  createShop: async (req, res) => {
    try {
      const { name } = req.body;

      const newShop = await models.shop.create({
        name: name,
      });
      res.json(newShop);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Update a Shop
  updateShop: async (req, res) => {
    try {
      const { id } = req.params;

      const shop = await models.shop.findByPk(id);
      if (!shop) {
        return res.status(404).json({ message: "Shop does not exists" });
      }
      shop.set(req.body);
      console.log(shop);
      await shop.save();

      return res.json(shop);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Delete using a logical variable
  deleteShop: async (req, res) => {
    try {
      const { id } = req.params;

      const shop = await models.shop.findByPk(id);
      if (!shop) {
        return res.status(404).json({ message: "Shop does not exists" });
      }
      shop.isDelete = true;
      await shop.save();
      console.log(shop);

      res.json(shop);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  //Find all products of one shop
  getShopAndProducts: async (req, res) => {
    const { id } = req.params;
    const shopProducts = await models.shop_products.findAll({
      where: { shopId: id },
      attributes: ["id", "name", "price", "isDelete"],
    });
    res.json(shopProducts);
  },
  getShopBuyByShopId: async (req, res) => {
    try {
      const { id } = req.params;
      const shopBuys = await models.shop_buys.findAll({
        where: { shopId: id },
      });
      if (!shopBuys) {
        return res.status(404).json({ message: "Buy does not exists" });
      }
      res.json(shopBuys);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
