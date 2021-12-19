<template>
  <div class="person">
    <a-form layout="inline">
      <a-form-item label="姓名">
        <a-input
          v-model:value="form.name"
          allow-clear
          placeholder="请输入"
          @pressEnter="onSearch"
        ></a-input>
      </a-form-item>
      <a-form-item label="所属学期">
        <a-select
          v-model:value="form.semesterId"
          placeholder="选择学期"
          allow-clear
          style="width: 172px"
        >
          <a-select-option v-for="item in semesters" :key="item.id" :value="item.id">{{
            item.semesterName
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :loading="loading"
      row-key="id"
      :data-source="users"
      :columns="columns"
      :pagination="false"
    >
      <template #gender="{ record }">
        <span>{{ Gender[record.gender] }}</span>
      </template>
      <template #semesters="{ record }">
        <a-tooltip placement="top">
          <template #title>
            <span>{{ record.semesters.map((item) => item.semesterName).toString() }}</span>
          </template>
          <span>{{ record.semesters.map((item) => item.semesterName).toString() }}</span>
        </a-tooltip>
      </template>
      <template #action="{ record }">
        <a-popconfirm title="确认删除当前学员？" @confirm="onDelete(record.id)">
          <a href="#">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-pagination
      v-model:current="pageIndex"
      :total="total"
      show-less-items
      @change="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { notification } from 'ant-design-vue';
import { ref, reactive, UnwrapRef, toRaw } from 'vue';
import { columns } from './table';
import { getSemesterListByPage, semester } from '../../modules/semester.module';
import {
  getWechatUserListByPage,
  deleteUser,
  RequestParams,
  Users,
} from '../../modules/wechatUser.modules';

enum Gender {
  '男' = 1,
  '女' = 2,
}

interface form {
  name: string;
  semesterId: string;
}

const form: UnwrapRef<form> = reactive({
  name: '',
  semesterId: '',
});

const semesters = ref<semester[] | undefined>([]);
const loading = ref<boolean>(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const users = ref<Users[] | undefined>([]);

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

const onPageChange = () => {
  getWechatUserList();
};

// 获取用户列表
const getWechatUserList = async () => {
  const param: RequestParams = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    ...toRaw(form),
  };
  loading.value = true;
  const { data: result } = await getWechatUserListByPage(param);
  loading.value = false;
  users.value = result.value?.list;
  total.value = result.value?.total || 0;
};

const onDelete = async (id: string) => {
  loading.value = true;
  const res: any = await deleteUser({ ids: [id] });
  loading.value = false;
  if (res.code === 0) {
    notification.success({ message: '删除成功!' });
    pageIndex.value = 1;
    getWechatUserList();
  }
};

onMounted: {
  getSemesterList();
  getWechatUserList();
}
</script>

<style lang="less" scoped>
.person .ant-pagination {
  margin-top: 24px;
}
.person .ant-form {
  margin-bottom: 24px;
}
</style>
