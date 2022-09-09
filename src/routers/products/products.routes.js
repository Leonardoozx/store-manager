const express = require('express');
const { allProducts, findById } = require('../../models/products');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await allProducts();
  res.status(200).json(products);
});

router.get('/:id', async ({ params }, res) => {
  const { id } = params;
  const productById = await findById(id);

  if (!productById[0]) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(productById[0]);
});

module.exports = router;