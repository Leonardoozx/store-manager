const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const salesService = require("../../../src/services/sales.service");
const salesMock = require('./mocks/sales.service.mock');

describe('Testing if the sales services are working correctly', function () {
  it('tests if the validateSaleId function returns the right values when calling it with an right saleId', async function () {
    sinon.stub(connection, "execute").resolves([salesMock.saleByIdCorrectMock]);

    const { type, message } = await salesService.validateSaleId(1);

    expect(type).equals(null);
    expect(message).equals('');
  });

  it("tests if the validateSaleId function returns the right values when calling it with an wrong saleId", async function () {
    sinon.stub(connection, "execute").resolves([salesMock.saleByIdIncorrectMock]);

    const { type, message } = await salesService.validateSaleId(999);

    expect(type).equals('NOT_FOUND');
    expect(message).equals("Sale not found");
  });

  afterEach(sinon.restore)
});