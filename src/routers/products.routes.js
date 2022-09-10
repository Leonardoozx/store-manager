const express = require('express');

const productsController = require('../controllers/products.controller');

const router = express.Router();

router.post('/', productsController.insertProduct);

router.get('/:id', productsController.productById);

router.get('/', productsController.allProducts);

module.exports = router;