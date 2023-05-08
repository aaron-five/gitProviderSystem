"use strict";

module.exports = (sequelize, DataTypes) => {
  let ShopBuys = sequelize.define(
    "shop_buys",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: Date.now(),
      },
      total: {
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
      providerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "providers", schema: "public" },
          key: "id",
        },
      },
      isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  ShopBuys.associate = (models) => {
    ShopBuys.belongsTo(models.shop);
    ShopBuys.belongsTo(models.provider);
    ShopBuys.hasMany(models.shop_buys_details);
  };
  return ShopBuys;
};
