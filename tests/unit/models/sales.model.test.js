const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const salesModelMock = require("./mocks/sales.model.mock");
const salesModel = require("../../../src/models/sales.model");

describe("Testing if the all the sales model functions are working correctly", function () {
  it("tests if the allSales function is returning the right values", async function () {
    sinon.stub(connection, "execute").resolves([salesModelMock.allSalesMock]);

    const allSales = await salesModel.allSales();

    expect(allSales[0].saleId).equals(salesModelMock.allSalesMock[0].saleId);
    expect(allSales[0].productId).equals(
      salesModelMock.allSalesMock[0].productId
    );
    expect(allSales[0].quantity).equals(
      salesModelMock.allSalesMock[0].quantity
    );
    expect(allSales[0].date).equals(salesModelMock.allSalesMock[0].date);

    expect(allSales[1].saleId).equals(salesModelMock.allSalesMock[1].saleId);
    expect(allSales[1].productId).equals(
      salesModelMock.allSalesMock[1].productId
    );
    expect(allSales[1].quantity).equals(
      salesModelMock.allSalesMock[1].quantity
    );
    expect(allSales[1].date).equals(salesModelMock.allSalesMock[1].date);
  });

  it("tests if the findSaleById function is returning the right values", async function () {
    sinon.stub(connection, "execute").resolves([salesModelMock.saleByIdMock]);

    const saleById = await salesModel.findSaleById(1);

    expect(saleById[0].productId).equals(
      salesModelMock.saleByIdMock[0].productId
    );
    expect(saleById[0].quantity).equals(
      salesModelMock.saleByIdMock[0].quantity
    );
    expect(saleById[0].date).equals(salesModelMock.saleByIdMock[0].date);
  });

  it("tests if the findSaleById function is returning the right values", async function () {
    sinon.stub(connection, "execute").resolves([5]);

    const lastSaleId = await salesModel.lastSaleId();

    expect(lastSaleId).equals(5);
  });

  it("tests if the insertNewSaleDate function is returning the right values", async function () {
    sinon.stub(connection, "execute").resolves([3]);

    const insertId = await salesModel.insertNewSaleDate();
    expect(insertId).equals(3);
  });

  it("tests if the insertNewSaleProduct function is returning the right values", async function () {
    sinon.stub(connection, "execute")
      .onFirstCall()
      .resolves([ 3 ])
      .onSecondCall()
      .resolves([salesModelMock.newInsertedSale]);

    await salesModel.insertNewSaleProduct(salesModelMock.salesInsertBody, 3);

    const newSale = await salesModel.findSaleById(salesModelMock.newInsertedSale);

    expect(newSale[0].saleId).equals(salesModelMock.newInsertedSale[0].saleId);
    expect(newSale[0].productId).equals(salesModelMock.newInsertedSale[0].productId);
    expect(newSale[0].quantity).equals(salesModelMock.newInsertedSale[0].quantity);
    expect(newSale[0].date).equals(salesModelMock.newInsertedSale[0].date);

  });

  afterEach(sinon.restore);
});
