const camelize = require('camelize');
const connection = require('./connection');

const allSales = async () => {
  const [sales] = await connection.execute(
    `SELECT
      sp.sale_id,
      sp.product_id,
      sp.quantity,
      s.date
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON s.id = sp.sale_id`,
  );
  return camelize(sales);
};

const findSaleById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT
      sp.product_id,
      sp.quantity,
      s.date
    FROM sales_products AS sp
    INNER JOIN sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?`,
    [saleId],
  );
  return camelize(sale);
};

module.exports = {
  allSales,
  findSaleById,
};
