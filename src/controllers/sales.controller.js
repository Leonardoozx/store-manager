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
  const obj = { id: lastSaleId + 1, itemsSold: body };
  salesModel.insertNewSaleDate();
  await Promise.all(
    body.map(async (bodyObj) => {
      const newSales = await salesModel.insertNewSaleProduct(bodyObj, obj.id);
      return newSales;
    }),
  );
  res.status(201).json(obj);
};

const deleteSale = async ({ params }, res) => {
  await salesModel.deleteSale(+params.id);
  res.status(204).send();
};

// Referência: https://stackoverflow.com/questions/70708529/can-multiple-rows-with-the-same-id-be-updated-at-the-same-time-with-one-query
const updateSaleById = async ({ params, body }, res) => {
  await salesModel.deleteSale(+params.id);
  const obj = {
    saleId: +params.id,
    itemsUpdated: body,
  };
  await Promise.all(
    body.map(
      async (bodyObj) => {
        const newObj = await salesModel.insertNewSaleProduct(bodyObj, +params.id);
        return newObj;
      },
    ),
  );
  res.status(200).json(obj);
};

module.exports = {
  showSales,
  insertSales,
  saleById,
  deleteSale,
  updateSaleById,
};
