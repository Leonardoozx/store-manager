const validatesName = ({ name }) => {
  if (!name) return { type: 'REQUIRED_FIELD', message: '"name" is required' };
  if (name.length < 5) {
    return { type: 'INVALID_FIELD', message: '"name" length must be at least 5 characters long' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validatesName,
};