const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const productsMock = require("./mocks/products.model.mock");
const productsModel = require("../../../src/models/productsModel");

describe("Testing if the products model functions is working correctly", function () {
  it("tests if it is possible to get all products from the database", async function () {
    sinon.stub(connection, "execute").resolves([productsMock]);

    const result = await productsModel.allProducts();

    expect(result).equals(productsMock);
  });

  it("tests if it is possible to find a product by id", async function () {
    sinon.stub(connection, "execute").resolves([productsMock[0]]);

    const result = await productsModel.findProductById(1);

    expect(result).equals(productsMock[0]);
  });
  afterEach(sinon.restore);
});
