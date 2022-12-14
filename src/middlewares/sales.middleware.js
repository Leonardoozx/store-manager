const validateSalesBody = require('../services/validations/validateSalesBody');
const productsModel = require('../models/products.model');
const salesModel = require('../models/sales.model');

const validateSaleFields = ({ body }, res, next) => {
  for (let i = 0; i < body.length; i += 1) {
    const { type, message, status } = validateSalesBody(body[i]);
    if (type) return res.status(status).json({ message });
}
  next();
};

const validateProductId = async ({ body }, res, next) => {
  // ReferĂȘncia: https://eslint.org/docs/latest/rules/no-await-in-loop;
  const results = [];
  for (let i = 0; i < body.length; i += 1) {
    results.push(productsModel.findProductById(body[i].productId));
  }
  const allProducts = await Promise.all(results);
  for (let i = 0; i < allProducts.length; i += 1) {
    if (!allProducts[i][0]) { return res.status(404).json({ message: 'Product not found' }); }
  }
  next();
};

const doesSaleExists = async ({ params }, res, next) => {
  const idSale = await salesModel.findSaleById(+params.id);
  if (!idSale[0]) return res.status(404).json({ message: 'Sale not found' });
  next();
};

module.exports = {
  validateSaleFields,
  validateProductId,
  doesSaleExists,
};
