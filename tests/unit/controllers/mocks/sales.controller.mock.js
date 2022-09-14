const allSalesMock = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2022-09-14T22:27:31.000Z",
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: "2022-09-14T22:27:31.000Z",
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: "2022-09-14T22:27:31.000Z",
  },
];

const saleByIdMock = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2022-09-14T22:27:31.000Z",
  },
];

const insertSaleBodyMock = {
  body: [
    {
      productId: 1,
      quantity: 10,
    },
  ],
};

module.exports = {
  allSalesMock,
  saleByIdMock,
  insertSaleBodyMock
};
