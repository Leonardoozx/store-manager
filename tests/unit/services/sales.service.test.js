const { expect } = require("chai");
const validateSalesBody = require("../../../src/services/validations/validateSalesBody");
const salesMock = require("./mocks/sales.service.mock");

describe("Testing if the sales services are working correctly", async function () {
  it("tests if the validateSalesBody function returns the right values when calling it without 'productId' in body", async function () {
    const EXPECTED_TYPE = 'PRODUCT ID REQUIRED';
    const EXPECTED_MESSAGE = '"productId" is required';
    const EXPECTED_STATUS = 400;


    const { type, message, status } = validateSalesBody(
      salesMock.salesBodyWithoutProductId
    );

    expect(type).equals(EXPECTED_TYPE);
    expect(message).equals(EXPECTED_MESSAGE);
    expect(status).equals(EXPECTED_STATUS);
  });

  it("tests if the validateSalesBody function returns the right values when calling it without 'quantity' in body", async function () {
    const EXPECTED_TYPE = "QUANTITY REQUIRED";
    const EXPECTED_MESSAGE = '"quantity" is required';
    const EXPECTED_STATUS = 400;

    const { type, message, status } = validateSalesBody(
      salesMock.salesBodyWithoutQuantity
    );

    expect(type).equals(EXPECTED_TYPE);
    expect(message).equals(EXPECTED_MESSAGE);
    expect(status).equals(EXPECTED_STATUS);
  });

  it("tests if the validateSalesBody function returns the right values when calling it with a wrong integer or negative quantity in body", async function () {
    const EXPECTED_TYPE = "UNVALIABLE QUANTITY";
    const EXPECTED_MESSAGE = '"quantity" must be greater than or equal to 1';
    const EXPECTED_STATUS = 422;

    const { type, message, status } = validateSalesBody(
      salesMock.salesBodyWithWrongIntQuantity
    );

    expect(type).equals(EXPECTED_TYPE);
    expect(message).equals(EXPECTED_MESSAGE);
    expect(status).equals(EXPECTED_STATUS);
  });

  it("tests if the validateSalesBody function returns the right values when calling it with fields in body", async function () {
    const EXPECTED_TYPE = null;
    const EXPECTED_MESSAGE = '';
    const EXPECTED_STATUS = 201;

    const { type, message, status } = validateSalesBody(
      salesMock.salesBodyWithRightValues
    );

    expect(type).equals(EXPECTED_TYPE);
    expect(message).equals(EXPECTED_MESSAGE);
    expect(status).equals(EXPECTED_STATUS);
  });
});
