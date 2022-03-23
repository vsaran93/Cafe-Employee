const { v4:uuid } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Cafe = sequelize.define('Cafe', {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: uuid()
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        logo: DataTypes.STRING,
        location: DataTypes.STRING,
    }, {
        tableName: 'Cafes'
    });

    Cafe.associate = function(models) {
        Cafe.hasMany(models.Employee, { foreignKey: 'cafeId' });
    };

    return Cafe;
};
