const { v4:uuid } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: uuid()
        },
        name: DataTypes.STRING,
        emailAddress: DataTypes.STRING,
        phoneNumber: DataTypes.STRING(8),
        gender: DataTypes.ENUM(['male', 'female']),
        cafeId: DataTypes.UUID,
        startDate: DataTypes.DATE,
    }, {});

    Employee.associate = function(models) {
      Employee.belongsTo(models.Cafe, { foreignKey: 'cafeId' });
    };

    return Employee;
};
