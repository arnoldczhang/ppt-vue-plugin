import Vue from 'vue';
import App from './App';
import router from './router';
// import Search from './plugins/Search';

Vue.config.productionTip = false;
// Vue.use(Search);
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
