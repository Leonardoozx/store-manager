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
  
  it('tests if the insert function is working correctly', async function () {
    sinon
      .stub(connection, "execute")
      .onFirstCall()
      .resolves([99])
      .onSecondCall()
      .resolves([productsMock.newProductMock]);
    
    const insertId = await productsModel.insertNewProduct('cell phone');
    const newProduct = await productsModel.findProductById(insertId);

    expect(newProduct).equals(productsMock.newProductMock);
  });
  afterEach(sinon.restore);
});
