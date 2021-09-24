import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import("@/layout/Layout.vue"),
    redirect: '/person',
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: () => import('@/views/Home.vue'),
      // },
      {
        path: '/person',
        name: 'Person',
        component: () => import('@/views/Person/List.vue'),
      },
      {
        path: '/work-release',
        name: 'WorkRelease',
        component: () => import('@/views/WorkRelease/List.vue'),
      },
      {
        path: '/work-release/create',
        name: 'WorkReleaseCreate',
        component: () => import('@/views/WorkRelease/Form.vue'),
      },
      {
        path: '/work-mark',
        name: 'WorkMark',
        component: () => import('@/views/WorkMark/List.vue'),
      },
      {
        path: '/semester',
        name: 'Semester',
        component: () => import('@/views/Semester.vue'),
      },
    ]
  },
];

export default createRouter({
  history: createWebHistory(),
  routes: routes,
});
