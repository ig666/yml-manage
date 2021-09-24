import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.less';
import "@/styles/default.less";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import 'moment/dist/locale/zh-cn';

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

const app = createApp(App);
app.use(router).use(store).use(Antd).mount('#app');
