import Vue from 'vue';
import App from './App';
import router from './router';
// import myPlugin from './plugins/myPlugin';

Vue.config.productionTip = false;
// Vue.use(myPlugin);
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
