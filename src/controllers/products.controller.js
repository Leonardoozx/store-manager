const productsModel = require('../models/products.model');
const productsService = require('../services/products.service');
const nameValidation = require('../services/validations/validatesName');

const { validatesName } = nameValidation;

const allProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  res.status(200).json(products);
};

const productById = async ({ params }, res) => {
  const { type, message } = await productsService.findProductById(params.id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message[0]);
};

const insertProduct = async ({ body }, res) => {
  const { type, message, status } = validatesName(body);
  if (type) {
    return res.status(status).json({ message });
  }
  console.log('opa 1');
  const newProductId = await productsService.insertNewProduct(body.name);
  console.log('opa 2');
  const { message: newProduct } = await productsService.findProductById(newProductId);
  res.status(201).json(newProduct[0]);
};

const updateProductById = async ({ params, body }, res) => {
  const { type, message, status } = validatesName(body);
  if (type) return res.status(status).json({ message });
  const obj = {
    id: +params.id,
    name: body.name,
  };
  await productsService.updateProductById(obj.name, obj.id);
  res.status(200).json(obj);
};

const deleteProduct = async ({ params }, res) => {
  await productsService.deleteProductById(+params.id);
  res.status(204).send();
};

// aqui pra baixo sem service
const showProductByQuery = async ({ query }, res) => {
  if (query.q !== '') {
    const productByName = await productsService.showProductsByName(query.q);
    return res.status(200).json(productByName);
  }
  const showAllProducts = await productsService.getAllProducts();
  res.status(200).json(showAllProducts);
};

module.exports = {
  allProducts,
  productById,
  insertProduct,
  updateProductById,
  deleteProduct,
  showProductByQuery,
};
