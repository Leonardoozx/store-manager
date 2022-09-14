const { expect } = require("chai");
const {
  validatesName,
} = require("../../../src/services/validations/validatesName");
const validateSalesBody = require("../../../src/services/validations/validateSalesBody");
const salesMock = require("./mocks/sales.service.mock");

describe("Testing if the validations are returning the rights values", function () {
  const REQUIRED_FIELD_RESPONSE = {
    type: "REQUIRED_FIELD",
    message: '"name" is required',
  };
  const INVALID_FIELD_RESPONSE = {
    type: "INVALID_FIELD",
    message: '"name" length must be at least 5 characters long',
  };
  const CORRECT_RESPONSE = { type: null, message: "" };

  it("tests if the validatesName function returns { type: 'REQUIRED_FIELD', message: '\"name\" is required' } when calling the function with an empty object", function () {
    const result = validatesName({});
    expect(result.type).equals(REQUIRED_FIELD_RESPONSE.type);
    expect(result.message).equals(REQUIRED_FIELD_RESPONSE.message);
  });

  it("tests if the validatesName function returns { type: 'REQUIRED_FIELD', message: '\"name\" length must be at least 5 characters long'' } when calling the function with an invalid name property", function () {
    const wrongNameObj = { name: "Leo" };
    const result = validatesName(wrongNameObj);
    expect(result.type).equals(INVALID_FIELD_RESPONSE.type);
    expect(result.message).equals(INVALID_FIELD_RESPONSE.message);
  });

  it("tests if the validatesName function returns { type: null, message: '' } when calling the function with valid name property", function () {
    const rightNameObj = { name: "Leonardo" };
    const result = validatesName(rightNameObj);
    expect(result.type).equals(CORRECT_RESPONSE.type);
    expect(result.message).equals(CORRECT_RESPONSE.message);
  });

  it("tests if the validateSalesBody function returns the right values when calling it without 'productId' in body", async function () {
    const EXPECTED_TYPE = "PRODUCT ID REQUIRED";
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
    const EXPECTED_MESSAGE = "";
    const EXPECTED_STATUS = 201;

    const { type, message, status } = validateSalesBody(
      salesMock.salesBodyWithRightValues
    );

    expect(type).equals(EXPECTED_TYPE);
    expect(message).equals(EXPECTED_MESSAGE);
    expect(status).equals(EXPECTED_STATUS);
  });
});
