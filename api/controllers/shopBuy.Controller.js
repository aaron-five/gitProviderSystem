const models = require("../database/models");
const shopBuysDetailsController = require("../controllers/shopbuysdetails.controller");

module.exports = {
  getShopBuys: async (req, res) => {
    try {
      //Get all buys including the Details
      const shopsBuys = await models.shop_buys.findAll({
        include: [
          {
            model: models.shop_buys_details,
          },
        ],
      });
      if (!shopsBuys) {
        return res.status(404).json({ message: "Shop does not exists" });
      }
      res.json(shopsBuys);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getShopBuy: async (req, res) => {
    try {
      const { id } = req.params;
      const shopBuys = await models.shop_buys.findOne({
        where: { id: id },
        include: [
          {
            model: models.shop_buys_details,
          },
        ],
      });
      if (!shopBuys) {
        return res.status(404).json({ message: "ShopBuy does not exists" });
      }
      res.json(shopBuys);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getShopBuysIncludeDetail: async (shopBuyid) => {
    try {
      const results = await models.shop_buys.findOne({
        where: { id: shopBuyid },
        include: [
          {
            model: models.shop_buys_details,
          },
        ],
      });

      return results;
    } catch (error) {
      throw error;
    }
  },
  createShopBuys: async (req, res) => {
    try {
      //receive the data
      const shopBuys = req.body;
      const Detalle = shopBuys.Detalle;

      if (Object.keys(Detalle).length === 0) {
        return res.status(500).json({
          message: "Debe ingresar productos para poder hacer la compra",
        });
      }

      //Create shop buy
      const newShopBuy = await models.shop_buys.create({
        shopId: shopBuys.shopId,
        providerId: shopBuys.providerId,
        total: 0,
      });

      //Call function to create Details
      const DetailsTotal = await shopBuysDetailsController.createDetails(
        Detalle,
        newShopBuy.id
      );
      if (DetailsTotal === false) {
        return res.status(500).json({
          message: "El producto no existe dentro de la base de datos",
        });
      }

      console.log("el total de los detalles es: ", DetailsTotal);

      newShopBuy.total = DetailsTotal;
      await newShopBuy.save();

      //Consult to return to client
      const results = await module.exports.getShopBuysIncludeDetail(
        newShopBuy.id
      );

      res.json(results);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateShopBuys: async (req, res) => {
    try {
      //data
      const shopBuyId = req.params.id;
      const Detalle = req.body.Detalle;

      if (Object.keys(Detalle).length === 0) {
        return res.status(500).json({
          message: "Debe ingresar productos para poder editar la compra",
        });
      }

      //find a shopbuy
      const shopBuy = await models.shop_buys.findOne({
        where: { id: shopBuyId },
      });
      if (!shopBuy) {
        return res.status(500).json({ message: "No existe la compra" });
      }

      //call function to edit ShopBuyDetails
      const DetailsTotal = await shopBuysDetailsController.editDetails(Detalle);
      if (DetailsTotal === false) {
        return res
          .status(500)
          .json({ message: "No se han encontrado los datos" });
      }
      shopBuy.total = DetailsTotal;
      await shopBuy.save();

      //call function to return a complete buy
      const results = await module.exports.getShopBuysIncludeDetail(shopBuy.id);

      //Return the results to the client
      res.json(results);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteShopBuys: async (req, res) => {
    const shopBuyId = req.params.id;

    try {
      const shopBuy = await models.shop_buys.findOne({
        where: { id: shopBuyId },
      });

      if (!shopBuy) {
        return res.status(500).json({ message: "No existe la compra" });
      }

      const deleteShopBuyDetail = await shopBuysDetailsController.deleteDetail(
        shopBuyId
      );
      if (deleteShopBuyDetail === false) {
        return res.status(500).json({
          message:
            "ha ocurrido un error, no se encontraron los Detalles de compra",
        });
      }
      shopBuy.isDelete = true;
      await shopBuy.save();

      const results = await module.exports.getShopBuysIncludeDetail(shopBuy.id);

      //Return the results to the client
      res.json(results);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getShopBuyDetailByShopBuyId: async (req, res) => {
    try {
      const { id } = req.params;
      const shopBuysDetail = await models.shop_buys_details.findAll({
        where: { shopBuyId: id },
      });
      if (Object.keys(shopBuysDetail).length === 0) {
        return res.status(500).json({
          message: "No se encontraron detalles de compra",
        });
      }

      res.json(shopBuysDetail);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
