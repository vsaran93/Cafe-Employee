const cafeService = require('../services/cafe.service');
const { validateCafe } = require('../utils/validation');
 
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
        const { error } = validateCafe(req.body);
        if (!error) {
            const cafe = await cafeService.create(req.body);
            res.status(200).json({ data: cafe });
        } else {
            res.status(400).json({ msg: error.details[0].message });
        }
    } catch (e) {
        res.status(e.statusCode || 500).json({ msg: e.message || 'internal error' });
    }
};


const update = async (req, res) => {
    try {
        const { error } = validateCafe(req.body);
        if (!error) {
            const cafe = await cafeService.update(req.body, req.params.id);
            res.status(200).json({ data: cafe });
        } else {
            res.status(400).json({ msg: error.details[0].message });
        }
    } catch (e) {
        res.status(500).json({ msg: 'internal server error' });
    }
};


module.exports = {
    getAllCafes,
    create,
    update
};