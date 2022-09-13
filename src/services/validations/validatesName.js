const validatesName = ({ name }) => {
  if (!name) {
    return {
      type: 'REQUIRED_FIELD',
      message: '"name" is required',
      status: 400,
    };
  }
  if (name.length < 5) {
    return {
      type: 'INVALID_FIELD',
      message: '"name" length must be at least 5 characters long',
      status: 422,
    };
  }
  return { type: null, message: '', status: 200 };
};

module.exports = {
  validatesName,
};
