const open = require('open')
const config = require('./config');
open(`http://${config.dev.host}:${config.dev.port}`);
