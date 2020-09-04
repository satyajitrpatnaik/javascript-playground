const BUY_ICE_CREAM = require('./index').BUY_ICE_CREAM;

module.exports = () => {
  return {
    type: BUY_ICE_CREAM,
    info: 'Buying Ice Cream.'
  };
};
