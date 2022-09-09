const connection = require('../connection');

const findById = async (productId) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

module.exports = findById;