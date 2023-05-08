const models = require("../database/models");

module.exports = {
  createDetails: async (Detalle, ShopBuyid) => {
    //this variable return to the main function
    var total = 0;
    const sequelize = models.sequelize;
    let transaction;

    try {
      transaction = await sequelize.transaction();

      for (const element of Detalle) {
        //Verify if products already exists in the database
        const shopProducts = await models.shop_products.findOne({
          where: { id: element.shopProductId },
          attributes: ["id", "name", "price"],
          transaction,
        });

        if (!shopProducts) {
          await transaction.rollback();
          return false;
        }
        //Create a new detail
        else {
          let quantity = element.quantity;
          let unitPrice = shopProducts.price;
          let subTotal = quantity * unitPrice;
          let productId = shopProducts.id;
          let shopBuyId = ShopBuyid;
          total = total + subTotal;

          const shopBuyDetails = await models.shop_buys_details.create(
            {
              quantity: quantity,
              unitPrice: unitPrice,
              total: subTotal,
              shopBuyId: shopBuyId,
              shopProductId: productId,
            },
            {
              transaction,
            }
          );
        }
      }

      await transaction.commit();
      return total;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      return false;
    }
  },
  editDetails: async (Detalle) => {
    //this variable return to the main function
    const sequelize = models.sequelize;
    var total = 0;
    let transaction;

    try {
      transaction = await sequelize.transaction();

      for (const element of Detalle) {
        //Verify if products already exists in the database

        const shopBuyDetail = await models.shop_buys_details.findOne({
          where: { id: element.shopBuyDetailId },
          transaction,
        });

        const shopProducts = await models.shop_products.findOne({
          where: { id: element.shopProductId },
          attributes: ["id", "name", "price"],
          transaction,
        });

        if (!shopProducts || !shopBuyDetail) {
          await transaction.rollback();
          return false;
        }
        //Editing the data
        else {
          shopBuyDetail.shopProductId = shopProducts.id;
          shopBuyDetail.quantity = element.quantity;
          shopBuyDetail.unitPrice = shopProducts.price;
          shopBuyDetail.total =
            shopBuyDetail.quantity * shopBuyDetail.unitPrice;
          total = total + shopBuyDetail.total;
          await shopBuyDetail.save({ transaction });
        }
      }

      await transaction.commit();
      return total;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      return false;
    }
  },
  deleteDetail: async (id) => {
    const sequelize = models.sequelize;
    let transaction;

    try {
      transaction = await sequelize.transaction();

      const shopBuyDetail = await models.shop_buys_details.findAll({
        where: { shopBuyId: id },
        transaction,
      });

      if (!shopBuyDetail || shopBuyDetail.length === 0) {
        return false;
      } else {
        for (const detail of shopBuyDetail) {
          await detail.update({ isDelete: true }, { transaction });
        }
      }

      await transaction.commit();
      return true;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      console.error(error);
      return false;
    }
  },
};
