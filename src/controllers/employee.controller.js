const employeeService = require('../services/employee.service');
const { validateEmployee } = require('../utils/validation');


const getAllEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees(req.query);
        res.status(200).json({ data: employees });
    } catch (e) {
        res.status(500).json({ msg: 'internal server error' });
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const employee = await employeeService.findEmployeeById(req.params.id);
        res.status(200).json({ data: employee });
    } catch (e) {
        res.status(500).json({ msg: 'internal server error' });
    }
}

const create = async (req, res) => {
    try {
        const { error } = validateEmployee(req.body);
        if (!error) {
            const employee = await employeeService.create(req.body);
            res.status(200).json({ data: employee });
        } else {
            res.status(400).json({ msg: error.details[0].message });
        }
    } catch (e) {
        res.status(e.statusCode || 500).json({ msg: e.message || 'internal error' });
    }
}

const update = async (req, res) => {
    try {
        const { error } = validateEmployee(req.body);
        if (!error) {
            const employee = await employeeService.update(req.body, req.params.id);
            res.status(200).json({ data: employee });
        } else {
            res.status(400).json({ msg: error.details[0].message });
        }
    } catch (e) {
        res.status(e.statusCode || 500).json({ msg: e.message || 'internal error' });
    }
}

const remove = async (req, res) => {
    try {
        if (!req.params.id) {
            const employee = await employeeService.remove(req.params.id);
            res.status(200).json({ data: employee });
        } else {
            res.status(400).json({ msg: 'Bad request' });
        }
    } catch (e) {
        res.status(500).json({ msg: 'internal server error' });
    }
};



module.exports = {
    create,
    update,
    remove,
    getAllEmployees,
    getEmployeeById
}