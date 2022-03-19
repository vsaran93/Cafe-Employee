const Employee = require('../models').Employee;
const ApiError = require('../utils/ApiError');


const create = async (employeeData) => {
    const isEmployeeExist = await findEmployeeByEmail(employeeData.email);
    if (isEmployeeExist) {
        throw ApiError(400, 'Employee already exist');
    }
    return Employee.create(employeeData);
};

const update = async (employeeData, employeeId) => {
    const employee = await findEmployeeById(employeeId);
    if (!employee) {
        throw ApiError(404, 'Employee not found');
    }
    return employee.update(employeeData);
};

const remove = async (employeeId) => {
    const employee = await findEmployeeById(employeeId);
    if (!employee) {
        throw ApiError(404, 'Employee not found');
    }
    await employee.destroy(employeeId);
    return employee;
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
    remove
}