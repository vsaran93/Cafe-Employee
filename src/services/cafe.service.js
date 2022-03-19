const Cafe = require('../models').Cafe;
const ApiError = require('../utils/ApiError');

const getAllCafes = async (args) => {
    const { location } = args;
    const whereObj = {};
    if (location) {
        whereObj.location = location;
    }
    return Cafe.findAll({ where: whereObj });
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

const findCafeByName = async (name) => {
    return Cafe.findOne({ where: { name } });
}

const findCafeById = async (id) => {
    return Cafe.find({ where: { id } });
}

module.exports = {
    getAllCafes,
    create,
    update
}