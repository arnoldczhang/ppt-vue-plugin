const fs = require('fs');
const ejs = require('ejs');
const router = require('koa-router')();
const renderer = require('./render');
const vueApp = require('../views/vue/App.js');
const jsonText = fs.readFileSync('./views/vue/template.json', 'utf8');

let compiler;

/*
 Functions
 */
const extend = (...args) => Object.assign.apply(null, args);
const isUndefined = (obj) => typeof obj === 'undefined';
const getHash = () => {
  const code = +String(Math.random()).substr(2);
  return code.toString(36);
};


/*
  Renderers
 */

async function vueShare (ctx) {
  await renderer.renderToString(vueApp(), {
    initialState: `<script>window.INITIAL_STATE = ${jsonText};</script>`,
    title: 'vue-plugin-share',
  }, (err, html) => {
    if (err) throw err;
    ctx.body = html;
  });
};

/*
  Router
 */
router
  .get('/', vueShare)
  ;

module.exports = (func) => {
  compiler = (fileName) => {
    return ejs.compile(fs.readFileSync(func.call(this, 'index'), 'utf8'));
  };
  return router;
};