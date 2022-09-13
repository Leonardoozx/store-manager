/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
const productsModel = require('../../models/products.model');

const validateSalesBody = (body) => {
  const { productId, quantity } = body;
  // for (let i = 0; i < body.length; i += 1) {
  if (!productId) {
    return {
      type: 'PRODUCT ID REQUIRED',
      message: '"productId" is required',
      status: 400,
    };
  }
  
  if (+quantity <= 0) {
    console.log('opa');
    return {
      type: 'UNVALIABLE QUANTITY',
      message: '"quantity" must be greater than or equal to 1',
      status: 422,
    };
  }
  if (!quantity) {
    return {
      type: 'QUANTITY REQUIRED',
      message: '"quantity" is required',
      status: 400,
    };
  }
  return { type: null, message: '', status: 201 };
};

module.exports = validateSalesBody;
