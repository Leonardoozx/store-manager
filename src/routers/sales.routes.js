const express = require('express');

const salesController = require('../controllers/sales.controller');
const salesMiddleware = require('../middlewares/sales.middleware');

const router = express.Router();

router.get('/:id', salesController.saleById);

router.post(
  '/',
  salesMiddleware.validateSaleFields,
  salesMiddleware.validateProductId,
  salesController.insertSales,
);

router.get('/', salesController.showSales);

router.delete('/:id', salesController.deleteSale);

module.exports = router;
