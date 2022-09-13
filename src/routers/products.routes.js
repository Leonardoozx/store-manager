const express = require('express');

const productsMiddleware = require('../middlewares/products.middleware');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.put('/:id', productsController.updateProductById);

router.get('/', productsController.allProducts);

router.get('/:id', productsController.productById);

router.post('/', productsController.insertProduct);

router.delete('/:id', productsMiddleware.validateProductId, productsController.deleteProduct);

module.exports = router;