const allSalesMock = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2022-09-14T03:55:47.000Z",
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: "2022-09-14T03:55:47.000Z",
  },
];

const saleByIdMock = [
  {
    productId: 1,
    quantity: 5,
    date: "2022-09-14T03:55:47.000Z",
  },
];

const salesInsertBody = [
  {
    productId: 1,
    quantity: 6,
  },
];

const newInsertedSale = [
  {
    saleId: 3,
    productId: 3,
    quantity: 15,
    date: "2022-09-14T03:55:47.000Z",
  },
];

module.exports = {
  saleByIdMock,
  allSalesMock,
  salesInsertBody,
  newInsertedSale
};
