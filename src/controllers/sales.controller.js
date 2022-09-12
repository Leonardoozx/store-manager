const salesModel = require('../models/sales.model');
const salesService = require('../services/sales.service');

const showSales = async (_req, res) => {
  const sales = await salesModel.allSales();
  res.status(200).json(sales);
};

const saleById = async ({ params }, res) => {
  const { type, message } = await salesService.validateSaleId(params.id);
  if (type) return res.status(404).json({ message });
  const idSale = await salesModel.findSaleById(params.id);
  res.status(200).json(idSale);
};

const insertProducts = (_req, res) => {
  res.status(200).json({ message: 'is working well' });
};

module.exports = {
  showSales,
  insertProducts,
  saleById,
};