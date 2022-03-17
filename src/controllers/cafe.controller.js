const cafeService = require('../services/cafe.service');

const getAllCafes = async (req, res) => {
    try {
        const cafes = await cafeService.getAllCafes(req.query);
        res.status(200).json({ data: cafes });
    } catch (e) {
        res.status(500).json({ msg: 'internal server error' });
    }
}

const create = async (req, res) => {
    try {
        const cafes = await cafeService.create(req.body);
        res.status(200).json({ data: cafes });
    } catch (e) {
        res.status(500).json({ msg: 'internal server error' });
    }
};


const update = async (req, res) => {
    try {
        const cafes = await cafeService.update(req.body, req.params.id);
        res.status(200).json({ data: cafes });
    } catch (e) {
        res.status(500).json({ msg: 'internal server error' });
    }
};


module.exports = {
    getAllCafes,
    create,
    update
};