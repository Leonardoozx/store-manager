const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { allProducts, findById } = require("../../../src/models/products");
const { allProductsMock } = require("./mocks/products.mock");

describe("Tests if the products route is working well", () => {
  it("tests if the /products returns all the products from the database", async () => {
    sinon.stub(connection, "execute").resolves([allProductsMock]);

    const result = await allProducts();

    expect(result).equals(allProductsMock);
  });

  it("tests if it is possible to find a product by id", async () => {
    sinon.stub(connection, "execute").resolves([allProductsMock[0]]);

    const result = await findById(1);

    expect(result).equals(allProductsMock[0]);
  });

  afterEach(sinon.restore);
});
