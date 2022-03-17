module.exports = (sequelize, DataTypes) => {
    const Cafe = sequelize.define('Cafe', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        logo: DataTypes.STRING,
        location: DataTypes.STRING,
    }, {});
    return Cafe;
};
