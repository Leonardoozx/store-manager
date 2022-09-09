const productsModel = require('../models/productsModel');
const productsService = require('../services/products.service');

const allProducts = async (_req, res) => {
  const products = await productsModel.allProducts();
  res.status(200).json(products);
};

const productById = async ({ params }, res) => {
  const { type, message } = await productsService.validateProductId(params.id);
  if (type) return res.status(404).json({ message });
  const idProduct = await productsModel.findProductById(params.id);
  res.status(200).json(idProduct[0]);
};

module.exports = {
  allProducts,
  productById,
};