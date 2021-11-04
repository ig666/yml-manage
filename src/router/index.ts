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
    redirect: '/login',
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
        path: '/account',
        name: 'Account',
        component: () => import('@/views/Account/List.vue'),
      },
      {
        path: '/account/create',
        name: 'AccountCreate',
        component: () => import('@/views/Account/Form.vue'),
      },
      {
        path: '/homework-template',
        name: 'HomeworkTemplate',
        component: () => import('@/views/HomeworkTemplate/List.vue'),
      },
      {
        path: '/homework-template/create',
        name: 'HomeworkTemplateCreate',
        component: () => import('@/views/HomeworkTemplate/Form.vue'),
      },
      {
        path: '/homework',
        name: 'Homework',
        component: () => import('@/views/Homework/List.vue'),
      },
      {
        path: '/homework/check',
        name: 'HomeworkCheck',
        component: () => import('@/views/Homework/Check.vue'),
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
