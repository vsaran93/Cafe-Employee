const express = require('express');
const router = express.Router();


const cafeRoutes = require('./cafe.routes');

const defaultRoutes = [
    {
        path: '/cafe',
        route: cafeRoutes
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;