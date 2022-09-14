const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const { expect } = chai;

const controllerProductsMock = require("./mocks/products.controller.mock");
const productsController = require("../../../src/controllers/products.controller");
const productsService = require("../../../src/services/products.service");
const productsModel = require("../../../src/models/products.model");
const connection = require("../../../src/models/connection");

const {
  rightControllerProductMock,
  wrongControllerProductMock,
  allProductsMock,
  reqBodyWithRightValues,
  reqBodyWithWrongValues,
  reqBodyWithoutNameField,
  rightInsertReqBody,
  reqQueryMock,
  emptyReqQueryMock
} = controllerProductsMock;

describe("Testing if the controller returns the right json", function () {
  const RESPONSE_WITHOUT_NAME_FIELD = { message: '"name" is required' };
  const RESPONSE_WRONG_NAME_LENGTH = {
    message: '"name" length must be at least 5 characters long',
  };

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

    sinon.stub(productsModel, "findProductById").resolves([allProductsMock[0]]);

    sinon
      .stub(productsService, "validateProductId")
      .resolves(rightControllerProductMock);

    await productsController.productById({ params: { id: 1 } }, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsMock[0]);
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
    expect(res.json).to.have.been.calledWith({
      message: wrongControllerProductMock.message,
    });
  });

  it("tests if it is not possible to insert a product with missing fields", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = reqBodyWithoutNameField;

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(RESPONSE_WITHOUT_NAME_FIELD);
  });

  it("tests if it is not possible to insert a product with missing fields", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = reqBodyWithWrongValues;

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(RESPONSE_WRONG_NAME_LENGTH);
  });

  it("tests if it is not possible to insert a product with missing fields", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = reqBodyWithRightValues;

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
  });

  it("tests if it is not possible to insert a product with missing fields", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = reqBodyWithRightValues;

    await productsController.insertProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
  });

  it("tests if it is not possible to update a product with missing name field", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = { body: {} };

    await productsController.updateProductById(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(RESPONSE_WITHOUT_NAME_FIELD);
  });

  it("tests if it is not possible to update a product with wrong name length", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = reqBodyWithWrongValues;

    await productsController.updateProductById(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(RESPONSE_WRONG_NAME_LENGTH);
  });

  it("tests if it is possible to update a product with right body", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = rightInsertReqBody;

    const RIGHT_RESPONSE = { id: 1, name: "Laptop" };

    await productsController.updateProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(RIGHT_RESPONSE);
  });

  it("tests if it is possible to show a product with right query", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = reqQueryMock;

    sinon.stub(connection, 'execute').resolves([{ id: 1, name: 'Martelo de Thor' }])

    await productsController.showProductByQuery(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it("tests if it is possible to show a product with right query", async function () {
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const req = emptyReqQueryMock;

    sinon
      .stub(connection, "execute")
      .resolves([allProductsMock]);

    await productsController.showProductByQuery(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  afterEach(sinon.restore);
});
