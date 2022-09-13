const express = require('express');

const productsController = require('../controllers/products.controller');

const router = express.Router();

router.put('/:id', productsController.updateProductById);

router.get('/', productsController.allProducts);

router.get('/:id', productsController.productById);

router.post('/', productsController.insertProduct);

module.exports = router;