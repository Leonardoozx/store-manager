const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const { expect } = chai;

const controllerProductsMock = require("./mocks/products.controller.mock");
const productsController = require("../../../src/controllers/products.controller");
const productsService = require("../../../src/services/products.service");
const productsModel = require("../../../src/models/productsModel");

const {
  rightControllerProductMock,
  wrongControllerProductMock,
  productIdMock,
  allProductsMock,
} = controllerProductsMock;

describe("Testing if the controller returns the right json", function () {
  it("testing if it returns all the right products", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsModel, "allProducts")
      .resolves(allProductsMock.allProductsMock);

    sinon
      .stub(productsService, "validateProductId")
      .resolves(rightControllerProductMock);

    await productsController.allProducts({}, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsMock.allProductsMock);
  });

  it("testing if it returns the right product id value", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsModel, "findProductById")
      .resolves([allProductsMock[0]]);

    sinon
      .stub(productsService, "validateProductId")
      .resolves(rightControllerProductMock);

    await productsController.productById({ params: { id: 1 } }, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(
      allProductsMock[0]
    );
  });

  it("testing if it returns an error message if the service doesn't approve", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(productsService, "validateProductId")
      .resolves(wrongControllerProductMock);

    await productsController.productById({ params: { id: 1 } }, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: wrongControllerProductMock.message });
  });

  afterEach(sinon.restore);
});
