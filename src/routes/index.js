const express = require('express');
const router = express.Router();


const cafeRoutes = require('./cafe.routes');
const employeeRoutes = require('./employee.routes');

const cafeController = require('../controllers/cafe.controller');
const employeeController = require('../controllers/employee.controller');

const defaultRoutes = [
    {
        path: '/cafe',
        route: cafeRoutes
    },
    {
        path: '/employee',
        route: employeeRoutes
    }
];

router.get('/cafes', cafeController.getAllCafes);
router.get('/employees', employeeController.getAllEmployees);

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;