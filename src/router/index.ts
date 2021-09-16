import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/views/Home.vue';

const routes = [
  { path: '/',
    name: 'layout',
    component: () => import("@/layout/Layout.vue"),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/person',
        name: 'person',
        component: () => import('@/views/Person/index.vue'),
      },
      {
        path: '/work-release',
        name: 'work-release',
        component: () => import('@/views/WorkRelease/index.vue'),
      },
      {
        path: '/work-mark',
        name: 'work-mark',
        component: () => import('@/views/WorkMark/index.vue'),
      },
    ]
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
