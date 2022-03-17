'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('employeeAllocations', {
      employeeId: {
        type: Sequelize.UUID,
        references: {
          model: 'Employees',
          key: 'id'
        }
      },
      cafeId: {
        type: Sequelize.UUID,
        references: {
          model: 'Cafes',
          key: 'id'
        }
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('employeeAllocations');
  }
};
