<template>
  <div class="work-release">
    <a-form layout="inline">
      <a-form-item label="名称">
        <a-input v-model:value="paramsState.name" placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item label="班级">
        <a-input v-model:value="paramsState.class" placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">搜索</a-button>
        <a-button style="margin-left: 8px;" type="primary" @click="onAdd">新增</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="data"
      rowKey="id"
      :pagination="false"
      :loading="loading"
    >
      <template #action="{ record }">
        <span>
          <a @click="onCheck(record.id)">查看</a>
          <a-divider type="vertical" />
          <a @click="onDelete(record.id)">删除</a>
        </span>
      </template>
    </a-table>
    <a-pagination
      v-model:current="pageIndex"
      :total="total"
      @change="onPageChange"
      show-less-items
    />
  </div>
</template>

<script setup lang="ts">
import { ref, UnwrapRef, reactive, toRaw } from 'vue';
import { useRouter } from "vue-router";
import { getSemesterListByPage, Semester } from '../../modules/semester.module'

interface ParamsState {
  name: string;
  class: string;
}

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];

const data = [
  {
    id: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    id: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    id: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const router = useRouter();
const paramsState: UnwrapRef<ParamsState> = reactive({
  name: '',
  class: '',
});
const semesters = ref<Semester[] | undefined>([]);
const loading = ref<boolean>(false);
const pageIndex = ref<number>(1);
const total = ref<number>(20);

const onAdd = ():void => {
  router.push({
    path: '/homework-template/create',
  })
}
const onCheck = (id: string): void => {
  console.log(id);
};
const onDelete = (id: string): void => {
  console.log(id);
};
const onSearch = ():void => {
  const params = toRaw(paramsState);
  loading.value = true;
};
const onPageChange = (page: number, pageSize: number): void => {
  console.log(page);
};

const getSemesterList = async () => {
  const { data:result } = await getSemesterListByPage({pageIndex: 1, pageSize: 999});
  semesters.value = result.value!.list;
};

onMounted: {
  getSemesterList();
}
</script>

<style scoped>
.work-release .ant-pagination {
  margin-top: 24px;
}
.work-release .ant-form {
  margin-bottom: 24px;
}
</style>
