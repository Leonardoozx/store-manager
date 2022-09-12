const express = require('express');

const productsController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', productsController.showSales);

router.get('/:id', productsController.saleById);

// router.post('/', productsController.insertSales);

module.exports = router;