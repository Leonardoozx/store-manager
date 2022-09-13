const productsModel = require('../models/products.model');

const validateProductId = async ({ params }, res, next) => {
  if (params) {
    const product = await productsModel.findProductById(+params.id);
    if (!product[0]) return res.status(404).json({ message: 'Product not found' });
    next();
  }
};

module.exports = {
  validateProductId,
};