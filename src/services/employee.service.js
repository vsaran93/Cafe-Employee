const { Op } = require('sequelize');
const Employee = require('../models').Employee;
const EmployeeAllocation = require('../models').EmployeeAllocation;
const ApiError = require('../utils/ApiError');


const create = async (employeeData) => {
    const isEmployeeExist = await findEmployeeByEmail(employeeData.email);
    if (isEmployeeExist) {
        throw ApiError(400, 'Employee already exist');
    }
    const employee =  await Employee.create(employeeData);
    await EmployeeAllocation.create({
        employeeId: employee.id,
        cafeId: employeeData.cafeId,
        startDate: new Date()
    });
    return employee;
};

const update = async (employeeData, employeeId) => {
    const employee = await findEmployeeById(employeeId);
    if (!employee) {
        throw ApiError(404, 'Employee not found');
    }
    await EmployeeAllocation.update({ cafeId: employeeData.cafeId }, {
        where: { employeeId }
    })
    return employee.update(employeeData);
};

const remove = async (employeeId) => {
    const employee = await findEmployeeById(employeeId);
    if (!employee) {
        throw ApiError(404, 'Employee not found');
    }
    await EmployeeAllocation.destroy({
        where: { employeeId }
    })
    await employee.destroy(employeeId);
    return employee;
};

const removeEmployeeByIds = async (Ids) => {
    await Employee.destroy({
        where: {
            [Op.in]: Ids
        }
    });
};

const findEmployeeByEmail = (email) => {
    return Employee.findOne({ email });
};

const findEmployeeById = (id) => {
    return Employee.findOne({ id });
};


module.exports = {
    create,
    update,
    remove,
    removeEmployeeByIds
}