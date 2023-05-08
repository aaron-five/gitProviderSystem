"use strict";

module.exports = (sequelize, DataTypes) => {
  let ShopBuysDetails = sequelize.define(
    "shop_buys_details",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unitPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      shopBuyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "shops_buys", schema: "public" },
          key: "id",
        },
      },
      shopProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "shop_products", schema: "public" },
          key: "id",
        },
      },
    },
    {
      timestamps: false,
    }
  );

  ShopBuysDetails.associate = (models) => {
    ShopBuysDetails.belongsTo(models.shop_buys);
    ShopBuysDetails.belongsTo(models.shop_products);
  };
  return ShopBuysDetails;
};
