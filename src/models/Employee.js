const shortId = require('shortid');
const generateShortId = () => {
  shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
  return shortId.generate();
};

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        emailAddress: DataTypes.STRING,
        phoneNumber: DataTypes.STRING(8),
        gender: DataTypes.ENUM(['male', 'female']),
        cafeId: DataTypes.UUID,
        startDate: DataTypes.DATE,
    }, {});

    Employee.beforeCreate(async (employee, options) => {
      const shortId = `UI${generateShortId()}`;
      employee.id = shortId;
    });

    Employee.associate = function(models) {
      Employee.belongsTo(models.Cafe, { foreignKey: 'cafeId' });
    };

    return Employee;
};
