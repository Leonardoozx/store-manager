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

const updateProductById = async (newName, id) => {
  const [{ info }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [newName, id],
  );
  return info;
};

const deleteProductById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = {
  allProducts,
  findProductById,
  insertNewProduct,
  updateProductById,
  deleteProductById,
};
