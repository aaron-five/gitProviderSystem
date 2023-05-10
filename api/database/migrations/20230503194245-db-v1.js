"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    await queryInterface.createTable(
      "shops",
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
        isDelete: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      { transaction }
    );

    await queryInterface.createTable(
      "shop_products",
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
        price: {
          type: Sequelize.DataTypes.DOUBLE,
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
        isDelete: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      { transaction }
    );

    transaction.commit();
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
