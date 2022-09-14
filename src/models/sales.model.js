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

const lastSaleId = async () => {
  const [sale] = await connection.execute(
    'SELECT id FROM sales ORDER BY id DESC LIMIT 1',
  );
  return sale;
};

const insertNewSaleDate = async () => {
  const date = new Date();
  const [insertId] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [date],
  );
  return insertId;
};

const insertNewSaleProduct = async ({ productId, quantity }, id) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, productId, quantity],
  );
};

module.exports = {
  allSales,
  findSaleById,
  lastSaleId,
  insertNewSaleDate,
  insertNewSaleProduct,
};
