const { expect } = require("chai");
const {
  validatesName,
} = require("../../../src/services/validations/validatesName");

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

  it("tests if the function returns { type: 'REQUIRED_FIELD', message: '\"name\" is required' } when calling the function with an empty object", function () {
    const result = validatesName({});
    expect(result.type).equals(REQUIRED_FIELD_RESPONSE.type);
    expect(result.message).equals(REQUIRED_FIELD_RESPONSE.message);
  });

  it("tests if the function returns { type: 'REQUIRED_FIELD', message: '\"name\" length must be at least 5 characters long'' } when calling the function with an invalid name property", function () {
    const wrongNameObj = { name: "Leo" };
    const result = validatesName(wrongNameObj);
    expect(result.type).equals(INVALID_FIELD_RESPONSE.type);
    expect(result.message).equals(INVALID_FIELD_RESPONSE.message);
  });

  it("tests if the function returns { type: null, message: '' } when calling the function with valid name property", function () {
    const rightNameObj = { name: "Leonardo" };
    const result = validatesName(rightNameObj);
    expect(result.type).equals(CORRECT_RESPONSE.type);
    expect(result.message).equals(CORRECT_RESPONSE.message);
  });
});
