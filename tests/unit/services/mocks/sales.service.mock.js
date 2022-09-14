const salesBodyWithoutProductId = {
  quantity: 5,
};

const salesBodyWithoutQuantity = {
  productId: 1,
};

const salesBodyWithWrongIntQuantity = {
  productId: 1,
  quantity: 0,
};

const salesBodyWithRightValues = {
  productId: 2,
  quantity: 5,
};

const saleByIdCorrectMock = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2022-09-14T03:21:59.000Z",
  },
];

const saleByIdIncorrectMock = [];

module.exports = {
  salesBodyWithWrongIntQuantity,
  salesBodyWithoutProductId,
  salesBodyWithoutQuantity,
  salesBodyWithRightValues,
  saleByIdCorrectMock,
  saleByIdIncorrectMock,
};
