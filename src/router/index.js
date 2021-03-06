import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: () => import('@/components/Hello'),
    },
    {
      path: '/old',
      name: 'Old',
      component: () => import('@/components/Old'),
    },
    {
      path: '/new',
      name: 'New',
      component: () => import('@/components/New'),
    },
    {
      path: '/newer',
      name: 'Newer',
      component: () => import('@/components/Newer'),
    },
  ],
});
