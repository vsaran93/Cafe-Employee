
module.exports = (sequelize, DataTypes) => {
    const Cafe = sequelize.define('Cafe', {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: require('sequelize').UUIDV4
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
