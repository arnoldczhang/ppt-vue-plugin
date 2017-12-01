import Vue from 'vue';
import Router from 'vue-router';
import EnterPage from '../pages/EnterPage';
import ListPage from '../pages/ListPage';
import ListPage2 from '../pages/ListPage2';
import ImagePage from '../pages/ImagePage';
import Demo from '../pages/Demo';
import WordPage from '../pages/WordPage';
import EndPage from '../pages/EndPage';

Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/1',
  },
  {
    path: '/1',
    name: 'EnterPage',
    component: EnterPage,
  },
];
const componentMap = {
  list2: ListPage2,
  list: ListPage,
  image: ImagePage,
  demo: Demo,
  word: WordPage,
};
const state = window.INITIAL_STATE;
const $push = Array.prototype.push;
state.unshift('');
$push.apply(routes, state.slice(2).map((value, i) => {
  const index = i + 2;
  return {
    path: `/${index}`,
    name: `page${index}`,
    component: componentMap[value.type],
  };
}));
routes.push({
  path: `/${routes.length}`,
  name: 'EndPage',
  component: EndPage,
});

export default new Router({
  routes,
});
