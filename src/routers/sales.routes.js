const express = require('express');

const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController.showSales);

router.get('/:id', salesController.saleById);

router.post('/', salesController.insertSales);

module.exports = router;