import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/views/Home.vue';

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
