'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return Promise.all([
        queryInterface.addColumn('Employees', 'cafeId',
        {
          type: Sequelize.UUID,
          references: {
            model: 'Cafes',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }),
        queryInterface.addColumn('Employees', 'startDate',
        {
          type: Sequelize.DATE,
        })
     ]); 
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Employees', 'cafeId'),
      queryInterface.removeColumn('Employees', 'startDate')
    ])
  }
};
