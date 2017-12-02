const path = require('path');
const Koa = require('koa');
const body = require('koa-body');
const logger = require('koa-logger');
const views = require('koa-views');
const compress = require('koa-compress');
const staticServer = require("koa-static");
const open = require('open');
const internalIP = require('internal-ip');
const host = internalIP.v4.sync() || '0.0.0.0';

const getViewPath = (fileName = '') => path.join(__dirname, `./views/${fileName ? fileName + '.ejs' : ''}`);
const router = require('./config/router')(getViewPath);
const app = new Koa();
const port = 3001;

app
  .use(views(getViewPath(), { extension: 'ejs' }))
  .use(staticServer(path.join(__dirname, './lib')))
  .use(body())
  .use(logger())
  .use(compress())
  .use(router.routes())
  .use(router.allowedMethods())
  ;

if (!module.parent) app.listen(port, () => {
  console.log(`koa started at ${port} port`);
  open(`http://${host}:${port}`);
});
