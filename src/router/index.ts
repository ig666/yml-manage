import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
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
        path: '/work-release/create',
        name: 'work-release-create',
        component: () => import('@/views/WorkRelease/Form.vue'),
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
  history: createWebHistory(),
  routes: routes,
});
