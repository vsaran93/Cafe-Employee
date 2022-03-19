const { uuid } = require('uuidv4');

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
    return Cafe;
};
