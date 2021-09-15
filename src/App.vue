<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback>
      <div>
        <a-spin :indicator="indicator" />
      </div>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
