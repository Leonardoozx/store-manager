const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const productsMock = require("./mocks/products.model.mock");
const productsModel = require("../../../src/models/products.model");

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

  it("tests if the insert function is working correctly", async function () {
    sinon
      .stub(connection, "execute")
      .onFirstCall()
      .resolves([99])
      .onSecondCall()
      .resolves([productsMock.newProductMock]);

    const insertId = await productsModel.insertNewProduct("cell phone");
    const newProduct = await productsModel.findProductById(insertId);

    expect(newProduct).equals(productsMock.newProductMock);
  });

  it("tests if the update product function is working correctly", async function () {
    await productsModel.updateProductById("Mjolnir", 1);
  });

  it("tests if the delete product function is working correctly", async function () {
    await productsModel.deleteProductById(2);
  });

  it("tests if the showProductByName function is working correctly", async function () {
    sinon
      .stub(connection, "execute")
      .resolves([productsMock.allProductsMock[0]]);

    const productByName = await productsModel.showProductsByName(
      productsMock.allProductsMock[0].name
    );

    expect(productByName).equals(productsMock.allProductsMock[0]);
  });

  afterEach(sinon.restore);
});
