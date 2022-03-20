const { Op } = require('sequelize');
const Cafe = require('../models').Cafe;
const Employee = require('../models').Employee;
const ApiError = require('../utils/ApiError');


const create = async (employeeData) => {
    const isEmployeeExist = await findEmployeeByEmail(employeeData.email);
    if (isEmployeeExist) {
        throw ApiError(400, 'Employee already exist');
    }

    const employee =  await Employee.build(employeeData);
    employee.startDate = new Date();
    await employee.save();
    return employee;
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

const getAllEmployees = async (args) => {
    const { cafe } = args;
    const whereObj = {};
    if (cafe) {
        whereObj.cafeId = cafe;
    }
    return Employee.findAll({ 
        where: whereObj,
        include: [
            {
                model: Cafe,
                attributes: ['name'],
            }
        ]
    });
}

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
    removeEmployeeByIds,
    getAllEmployees
}