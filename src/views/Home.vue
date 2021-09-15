<template>
  <div class="home">
    <a-button type="primary">点击</a-button>
    <div v-for="(item, key) in info" :key="key" class="home-radio">
      {{ key }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

import { getPersonInfo, Person } from '../modules/person';

const info = ref<Person | undefined>();

onMounted: {
  const { personInfo } = await getPersonInfo({ pageIndex: 1, pageSize: 20 });
  info.value = personInfo.value;
}

const color = ref('yellow');
</script>

<style>
.home .home-radio {
  background-color: v-bind(color);
}
</style>
