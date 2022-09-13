const salesModel = require('../models/sales.model');
const salesService = require('../services/sales.service');
const validateSalesBody = require('../services/validations/validateSalesBody');
const productsModel = require('../models/products.model');

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
  for (let i = 0; i < body.length; i += 1) {
      const { type, message, status } = validateSalesBody(body[i]);
    if (type) return res.status(status).json({ message });
      // const opa = await productsModel.findProductById(productId);
      // if (!opa[0]) return res.status(404).json({ message: 'Product not found' });
      // const product = await productsModel.findProductById(saleBody.productId);
      // if (!product[0]) { return res.status(404).json({ message: 'Product not found' }); }
    // });
  }
  
  res.status(201).json({ message: 'TAERADO' });
};

module.exports = {
  showSales,
  insertSales,
  saleById,
};
