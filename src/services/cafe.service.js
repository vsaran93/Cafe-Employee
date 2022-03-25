const Cafe = require('../models').Cafe;
const Employee = require('../models').Employee;

const ApiError = require('../utils/ApiError');

const employeeService = require('../services/employee.service');

const getAllCafes = async (args) => {
    const { location } = args;
    const whereObj = {};
    if (location) {
        whereObj.location = location;
    }
    return Cafe.findAll({
        attributes: ['id', 'name', 'description', 'logo', 'location'],
        where: whereObj,
        include: [
            {
                model: Employee,
                attributes: ['id', 'name'],
            }
        ]
    });
}

const create = async (cafeData) => {
    const isCafeExist = await findCafeByName(cafeData.name);
    if (isCafeExist) {
        throw new ApiError(400, 'Cafe already Exist');
    }
    return Cafe.create(cafeData);
}

const update = async (cafeData, cafeId) => {
    const cafe = await findCafeById(cafeId);
    if (!cafe) {
        throw new ApiError(404, 'Cafe not found');
    }
    return cafe.update(cafeData);
}

const remove = async (cafeId) => {
    const cafe = await findCafeById(cafeId);
    if (!cafe) {
        throw new ApiError(404, 'Cafe not found');
    }
    const allocatedEmployeeIds = await getAllocatedEmployeeIds(cafeId);
    await cafe.destroy(cafeId);
    await employeeService.removeEmployeeByIds(allocatedEmployeeIds);
    return cafe;
}

const findCafeByName = async (name) => {
    return Cafe.findOne({ where: { name } });
}

const findCafeById = async (id) => {
    return Cafe.findOne({ where: { id } });
}

const getAllocatedEmployeeIds = async (cafeId) => {
    return Employee.findAll({ 
        attributes: ['employeeId'], 
        where: { cafeId } 
    });
};

const availableCafes = () => {
    return Cafe.findAll({
        attributes: ['id', 'name'],
    })
};

module.exports = {
    getAllCafes,
    create,
    update,
    remove,
    findCafeById,
    availableCafes
}