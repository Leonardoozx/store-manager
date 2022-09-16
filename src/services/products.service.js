const productsModel = require('../models/products.model');

const findProductById = async (productId) => {
  const productById = await productsModel.findProductById(productId);
  if (!productById[0]) { return { type: 'NOT FOUND', message: 'Product not found' }; }
  return { type: null, message: productById };
};

const getAllProducts = async () => {
  const allProducts = await productsModel.allProducts();
  return allProducts;
};

const insertNewProduct = async (name) => {
  const newProductId = await productsModel.insertNewProduct(name);
  return newProductId;
};

const updateProductById = async (name, id) => {
  await productsModel.updateProductById(name, id);
};

const deleteProductById = async (id) => {
  await productsModel.deleteProductById(id);
};

const showProductsByName = async (query) => {
  const productByName = await productsModel.showProductsByName(query);
  return productByName;
};

module.exports = {
  findProductById,
  getAllProducts,
  insertNewProduct,
  updateProductById,
  deleteProductById,
  showProductsByName,
};
