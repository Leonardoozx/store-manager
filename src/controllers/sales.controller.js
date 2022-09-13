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

const insertSales = async ({ body }, res) => {
  const [{ id: lastSaleId }] = await salesModel.lastSaleId();
  const obj = {
    id: lastSaleId + 1,
    itemsSold: body,
  };
  salesModel.insertNewSaleDate();
  await Promise.all(body.map(async (bodyObj) => {
    const newSales = await salesModel.insertNewSaleProduct(bodyObj, obj.id);
    return newSales;
  }));
  res.status(201).json(obj);
};

module.exports = {
  showSales,
  insertSales,
  saleById,
};
