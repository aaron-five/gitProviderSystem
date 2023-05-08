"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "shop_buys_details",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          quantity: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
          },
          unitPrice: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
          },
          total: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
          },
          isDelete: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          shopBuyId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: { tableName: "shop_buys", schema: "public" },
              key: "id",
            },
          },
          shopProductId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: { tableName: "shop_products", schema: "public" },
              key: "id",
            },
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable("shop_buys_details");
  },
};
