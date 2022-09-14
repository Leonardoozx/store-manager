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

const reqBodyWithWrongValues = {
  body: {
    name: "capa",
  },
};

const reqBodyWithoutNameField = {
  body: {
    WRONG_NAME: "leonardo",
  },
};

const reqBodyWithRightValues = {
  body: {
    name: "Playstation 5",
  },
};

const newProductMock = {
  id: 4,
  name: reqBodyWithRightValues.name,
};

const rightInsertReqBody = {
  params: { id: "1" },
  body: { name: "Laptop" },
};

const reqQueryMock = {
  query: { q: "Martelo" },
};

const emptyReqQueryMock = {
  query: { q: "" },
};

module.exports = {
  rightControllerProductMock,
  wrongControllerProductMock,
  allProductsMock,
  reqBodyWithRightValues,
  reqBodyWithoutNameField,
  reqBodyWithWrongValues,
  newProductMock,
  rightInsertReqBody,
  reqQueryMock,
  emptyReqQueryMock,
};
