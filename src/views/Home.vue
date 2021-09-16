<template>
  <div class="home">
    <a-button type="primary" @click="onClick">点击</a-button>
    <div v-for="(item, key) in info" :key="key" class="home-radio">
      {{ key }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';

import { getPersonInfo, Person } from '../modules/person';

const info = ref<Person | undefined>();

const loadData = async (pageIndex:number, pageSize:number) => {
  const { personInfo } = await getPersonInfo({ pageIndex, pageSize });
  info.value = personInfo.value;
}

const onClick = () => {
  loadData(1, 10);
}

onMounted: {
  loadData(1, 20);
}

</script>

<style scoped>
.home .home-radio {
  background-color: yellow;
}
</style>
