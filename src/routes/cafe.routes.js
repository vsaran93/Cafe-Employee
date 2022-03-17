const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafe.controller');

router.get('/', cafeController.getCafes);

router.post('/', cafeController.create);

router.put('/:id', cafeController.update);

module.exports = router;