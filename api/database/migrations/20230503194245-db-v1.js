"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    await queryInterface.addColumn(
      "shop_products",
      "shopId",
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "shops", schema: "public" },
          key: "id",
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
