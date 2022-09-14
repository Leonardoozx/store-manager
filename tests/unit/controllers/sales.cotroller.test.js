const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const salesControllerMock = require("./mocks/sales.controller.mock");
const salesController = require("../../../src/controllers/sales.controller");

describe("Testing if the sales controllers are working correctly", function () {
  it("tests if the showSales function returns all the sales from DB", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = {};

    sinon
      .stub(connection, "execute")
      .resolves([salesControllerMock.allSalesMock]);

    await salesController.showSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesControllerMock.allSalesMock);
  });

  it("tests if it is possible to show a sale by it id", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = { params: { id: "1" } };

    sinon
      .stub(connection, "execute")
      .resolves([salesControllerMock.saleByIdMock]);

    await salesController.saleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesControllerMock.saleByIdMock);
  });

  it("tests if it is possible to insert a sale", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = salesControllerMock.insertSaleBodyMock;

    sinon
      .stub(connection, "execute")
      .onFirstCall()
      .resolves([[{ id: 2 }]])
      .onSecondCall()
      .resolves([[{ id: 2 }]])
      .onThirdCall()
      .resolves([salesControllerMock.insertSaleBodyMock]);

    const RIGHT_RESPONSE = {
      id: 3,
      itemsSold: [{ productId: 1, quantity: 10 }],
    };
    await salesController.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(RIGHT_RESPONSE);
  });

  afterEach(sinon.restore);
});
