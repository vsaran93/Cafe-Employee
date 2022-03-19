
module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('EmployeeAllocation', {
        employeeId: DataTypes.UUID,
        cafeId: DataTypes.UUID,
        startDate: DataTypes.DATE,
    }, {});
    return Employee;
};
