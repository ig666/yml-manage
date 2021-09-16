<template>
  <a-layout>
    <a-layout-sider
      :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
    >
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        v-model:selectedKeys="selectedKeys"
        @select="selectMenu"
      >
        <a-menu-item v-for="item in menuList" :key="item.key">
          <user-outlined />
          <span class="nav-text">{{ item.name }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" />
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            minHeight: 'calc(100vh - 158px)',
          }"
        >
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        YML ©2021 Created by cc
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
} from '@ant-design/icons-vue';

type MenuList = {
  key: string;
  name: string;
}[];

const menuList: MenuList = [
  {
    key: '/home',
    name: '首页',
  },
  {
    key: '/person',
    name: '学员管理',
  },
  {
    key: '/work-release',
    name: '作业发布',
  },
  {
    key: '/work-mark',
    name: '作业批改',
  },
];

const router = useRouter();
const path = router.currentRoute.value.path;

const selectedKeys = ref<string[]>([path]);

const selectMenu = ({ key }: { key: any }): void => {
  router.push({
    path: key,
  })
};
</script>

<style scoped>
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
