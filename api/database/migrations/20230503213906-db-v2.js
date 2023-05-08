"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "providers",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
          },
          phone: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            validate: {
              len: [8, 8],
            },
          },
          isDelete: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
        },
        { transaction }
      );
      await queryInterface.createTable(
        "shop_buys",
        {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          date: {
            type: Sequelize.DataTypes.DATEONLY,
            defaultValue: Date.now(),
          },
          total: {
            type: Sequelize.DataTypes.DECIMAL,
            allowNull: false,
          },
          shopId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: { tableName: "shops", schema: "public" },
              key: "id",
            },
          },
          providerId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: { tableName: "providers", schema: "public" },
              key: "id",
            },
          },
          isDelete: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
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
    queryInterface.dropTable("providers"),
      queryInterface.dropTable("shop_buys");
  },
};
