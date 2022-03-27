const { Op } = require('sequelize');
const Cafe = require('../models').Cafe;
const Employee = require('../models').Employee;
const ApiError = require('../utils/ApiError');
const sequelize = require('../models').sequelize;

const create = async (employeeData) => {
    const isEmployeeExist = await findEmployeeByEmail(employeeData.emailAddress);
    if (isEmployeeExist) {
        throw new ApiError(400, 'Employee already exist');
    }
    const employee =  await Employee.build(employeeData);
    employee.startDate = new Date();
    await employee.save();
    return employee;
};

const update = async (employeeData, employeeId) => {
    const employee = await findEmployeeById(employeeId);
    if (!employee) {
        throw new ApiError(404, 'Employee not found');
    }
    employeeData.startDate = employee.startDate || new Date();
    return employee.update(employeeData);
};

const remove = async (employeeId) => {
    const employee = await findEmployeeById(employeeId);
    if (!employee) {
        throw new ApiError(404, 'Employee not found');
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
        attributes: [
            [sequelize.fn('datediff', sequelize.fn("NOW") , sequelize.col('startDate')), 'daysWorked'],
            'id',
            'name',
            'emailAddress',
            'gender',
            'cafeId',
            'phoneNumber'
        ],
        where: whereObj,
        include: [
            {
                model: Cafe,
                attributes: ['name'],
            }
        ]
    });
}

const removeEmployeeByIds = async (Ids, transaction) => {
    await Employee.destroy({
        where: {
            id: {
                [Op.in]: Ids
            }
        },
        transaction
    });
};

const findEmployeeByEmail = (emailAddress) => {
    return Employee.findOne({ where: { emailAddress } });
};

const findEmployeeById = (id) => {
    return Employee.findOne({ where: { id } });
};


module.exports = {
    create,
    update,
    remove,
    removeEmployeeByIds,
    getAllEmployees,
    findEmployeeById
}