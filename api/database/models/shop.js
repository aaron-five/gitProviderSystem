"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  let Shop = sequelize.define("shop", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Shop.associate = (models) => {
    Shop.hasMany(models.shop_products, {
      foreignKey: "shopId",
      sourceKey: "id",
    });
    Shop.hasMany(models.shop_buys, {
      foreignKey: "shopId",
      sourceKey: "id",
    });
  };
  return Shop;
};
