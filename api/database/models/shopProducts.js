"use strict";

module.exports = (sequelize, DataTypes) => {
  const ShopProducts = sequelize.define("shop_products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    shopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: { tableName: "shops", schema: "public" },
        key: "id",
      },
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  ShopProducts.associate = (models) => {
    ShopProducts.belongsTo(models.shop);
    ShopProducts.hasOne(models.shop_buys_details);
  };
  return ShopProducts;
};
