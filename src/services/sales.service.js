const salesModel = require('../models/sales.model');

const validateSaleId = async (saleId) => {
  const saleById = await salesModel.findSaleById(saleId);
  if (!saleById[0]) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: '' };
};

module.exports = {
  validateSaleId,
};