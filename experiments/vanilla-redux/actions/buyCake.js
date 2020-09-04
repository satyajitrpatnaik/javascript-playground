const BUY_CAKE = require('./index').BUY_CAKE;

module.exports = () => {
  return {
    type: BUY_CAKE,
    info: 'Buying a cake.'
  };
};
