const productsModel = require('../models/products.model');

const validateProductId = async (productId) => {
  const productById = await productsModel.findProductById(productId);
  if (!productById[0]) return { type: 'NOT FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  validateProductId,
};