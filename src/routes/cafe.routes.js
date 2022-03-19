const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafe.controller');

router.post('/', cafeController.create);

router.put('/:id', cafeController.update);

router.get('/', cafeController.getAllCafes);

module.exports = router;