"use strict";

module.exports = (sequelize, DataTypes) => {
  let Provider = sequelize.define(
    "provider",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [8, 8],
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

  Provider.associate = (models) => {
    Provider.hasMany(models.shop_buys, {
      foreignKey: "providerId",
      sourceKey: "id",
    });
  };
  return Provider;
};
