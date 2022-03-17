const Cafe = require('../models').Cafe;

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
        return false;
    }
    return Cafe.create(cafeData);
}

const update = async (cafeData, cafeId) => {
    const cafe = await findCafeById(cafeId);
    if (!cafe) {
        return false;
    }
    return cafe.update(cafeData);
}

const findCafeByName = async (name) => {
    return Cafe.find({ where: { name } });
}

const findCafeById = async (id) => {
    return Cafe.find({ where: { id } });
}

module.exports = {
    getAllCafes,
    create,
    update
}