const open = require('open')
const internalIP = require('internal-ip')
const host = internalIP.v4.sync() || '0.0.0.0'

module.exports = () => {
  setTimeout(() =>open(`http://${host}`), 3000);
};