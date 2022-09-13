const connection = require('./connection');

const allProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findProductById = async (productId) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const insertNewProduct = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [productName],
  );
  return insertId;
};

const updateProductById = async (name, id) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [
    name,
    id,
  ]);
};

module.exports = {
  allProducts,
  findProductById,
  insertNewProduct,
  updateProductById,
};
