const express = require('express');
const router = express.Router();


const cafeRoutes = require('./cafe.routes');
const employeeRoutes = require('./employee.routes');

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

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;