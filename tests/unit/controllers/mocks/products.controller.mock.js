const rightControllerProductMock = {
  type: null,
  message: "",
};

const wrongControllerProductMock = {
  type: "NOT FOUND",
  message: "Product not found",
};

const allProductsMock = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const productIdMock = [
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

module.exports = {
  rightControllerProductMock,
  wrongControllerProductMock,
  allProductsMock,
  productIdMock
};
