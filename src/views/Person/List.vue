<template>
  <div class="person">
    <a-form layout="inline">
      <a-form-item label="姓名">
        <a-input v-model:value="form.name" placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item label="所属学期">
        <a-select v-model:value="form.semesterId" style="width: 172px">
          <a-select-option v-for="item in semesters" :value="item.id" :key="item.id">{{ item.semesterName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">搜索</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, UnwrapRef, toRaw } from "vue";
import { getSemesterListByPage, Semester } from "../../modules/semester.module";
interface form{
  name: string;
  semesterId: string
}


const form: UnwrapRef<form> = reactive({
  name: '',
  semesterId: ''
})

const semesters = ref<Semester[] | undefined>([]);
const loading = ref<boolean>(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);

const onSearch = () => {
  pageIndex.value = 1;
  getWechatUserList();
};

const getSemesterList = async () => {
  const { data: result } = await getSemesterListByPage({
    pageIndex: 1,
    pageSize: 999,
  });
  semesters.value = result.value!.list;
};

const getWechatUserList = () => {

}


</script>

<style scoped></style>
