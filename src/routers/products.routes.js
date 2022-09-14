const express = require('express');

const productsMiddleware = require('../middlewares/products.middleware');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/search', productsController.showProductByQuery);

router.post('/', productsController.insertProduct);

router.get('/', productsController.allProducts);

router.get('/:id', productsController.productById);

router.put('/:id', productsMiddleware.validateProductId, productsController.updateProductById);

router.delete('/:id', productsMiddleware.validateProductId, productsController.deleteProduct);

module.exports = router;