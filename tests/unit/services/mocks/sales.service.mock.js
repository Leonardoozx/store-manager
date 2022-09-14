const salesBodyWithoutProductId = {
  quantity: 5
};

const salesBodyWithoutQuantity = {
  productId: 1,
};

const salesBodyWithWrongIntQuantity = {
  productId: 1,
  quantity: 0
}

const salesBodyWithRightValues = {
  productId: 2,
  quantity: 5
};

module.exports = {
  salesBodyWithWrongIntQuantity,
  salesBodyWithoutProductId,
  salesBodyWithoutQuantity,
  salesBodyWithRightValues,
};