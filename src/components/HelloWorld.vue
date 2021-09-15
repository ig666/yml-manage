<template>
  <h1>{{ msg }}</h1>
  <p>count is: {{ state.count }}</p>
  <p>double count is: {{ state.double }}</p>
  <button @click="state.count++">increase</button>
</template>

<script setup lang="ts">
import { reactive, computed, ref, watch, inject, provide } from 'vue';

type DState = {
  count: number;
  double: number;
};

defineProps({
  msg: String,
});

const name = inject('name');
console.log('name', name);

const state: DState = reactive({
  count: 0,
  double: computed(() => state.count * 2),
});

watch(
  () => state.count,
  (v) => {
    console.log(v);
  },
  {
    immediate: true,
  }
);

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 0,
        data: [
          { id: 1, name: 'test', age: 12 },
          { id: 2, name: '瞪圆圆', age: 23 },
        ],
        message: 'success',
      });
    }, 500);
  });
};

const getListByPage = async (pageIndex: number, pageSize: number) => {
  const data = await fetchData();
  console.log(data);
};

onMounted: {
  console.log('vue3 app mounted!!');
  getListByPage(1, 10);
}
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
