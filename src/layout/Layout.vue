<template>
  <a-layout style="height: 100%">
    <a-layout-sider
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" @select="selectMenu">
        <a-menu-item v-for="item in menuList" :key="item.key">
          <span class="nav-text">{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <nav-bar>
          <template #right>
            <a-dropdown>
              <div style="cursor: pointer">
                <span style="margin-right: 8px">@cc</span>
                <a-avatar src="http://m.imeitou.com/uploads/allimg/2020052715/ihzlr0erues.jpeg" />
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;" @click="onLogout">退出登陆</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </nav-bar>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'auto' }">
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: 'calc(100vh - 200px)',
          }"
        >
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="fade-transform">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center', background: '#F8F8FA' }">
        <div>YML ©2021 Created by cc</div>
        <div>
          <img src="../assets/police.png" alt="" />
          <a target="_black" href="http://beian.miit.gov.cn/">蜀ICP备2021025142</a>
        </div>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from './components/NavBar.vue';

type MenuList = {
  key: string;
  name: string;
}[];

const menuList: MenuList = [
  // {
  //   key: '/home',
  //   name: '首页',
  // },
  {
    key: '/person',
    name: '学员管理',
  },
  {
    key: '/homework-template',
    name: '作业模版管理',
  },
  {
    key: '/homework',
    name: '作业管理',
  },
  {
    key: '/semester',
    name: '学期管理',
  },
  {
    key: '/account',
    name: '账号管理',
  },
  {
    key: '/wechatOrder',
    name: '订单管理',
  },
  {
    key: '/goodGroup',
    name: '评优分组',
  },
];

const router = useRouter();
const path = router.currentRoute.value.path;

const selectedKeys = ref<string[]>([path]);

const selectMenu = ({ key }: { key: any }): void => {
  router.push({
    path: key,
  });
};

const onBreakpoint = (broken: boolean) => {
  // console.log(broken);
};
const onCollapse = (collapsed: boolean, type: string) => {
  // console.log(collapsed, type);
};
const onLogout = () => {
  localStorage.removeItem('token');
  router.push({ path: '/login' });
};
</script>

<style lang="less" scoped>
.ant-layout-sider-children .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
