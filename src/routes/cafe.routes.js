const express = require('express');
const router = express.Router();
const cafeController = require('../controllers/cafe.controller');

router.get('/:id', cafeController.getCafeDetailsById);

router.post('/', cafeController.create);

router.put('/:id', cafeController.update);

router.delete('/:id', cafeController.remove);



module.exports = router;