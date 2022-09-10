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

module.exports = {
  allProducts,
  findProductById,
  insertNewProduct,
};
