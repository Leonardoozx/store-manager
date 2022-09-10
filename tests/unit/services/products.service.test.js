const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const productIdMock = require("./mocks/productId.service.mock");
const productsService = require("../../../src/services/products.service");

describe("Testing if products services is working correctly", function () {
  it("tests if with a wrong id, it returns '{'type': 'NOT FOUND','message': 'Product not found'}'", async function () {
    const { type, message } = await productsService.validateProductId(999);

    expect(type).equals("NOT FOUND");
    expect(message).equals("Product not found");
  });

  it("tests if with a right id, it returns '{'type': null, 'message': ''}'", async function () {
    sinon.stub(connection, "execute").resolves([productIdMock]);

    const { type, message } = await productsService.validateProductId(1);

    expect(type).equals(null);
    expect(message).equals("");
  });

  afterEach(sinon.restore);
});
