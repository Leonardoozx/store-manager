const productsModel = require('../models/productsModel');
const productsService = require('../services/products.service');
const nameValidation = require('../services/validations/validatesName');

const { validatesName } = nameValidation;

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

const insertProduct = async ({ body }, res) => {
  const { type, message } = validatesName(body);
  if (type && type === 'REQUIRED_FIELD') { return res.status(400).json({ message }); }
  if (type && type === 'INVALID_FIELD') { return res.status(422).json({ message }); }
  const newProductId = await productsModel.insertNewProduct(body.name);
  const newProduct = await productsModel.findProductById(newProductId);
  res.status(201).json(newProduct[0]);
};

module.exports = {
  allProducts,
  productById,
  insertProduct,
};