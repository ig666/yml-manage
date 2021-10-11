<template>
  <div class="homework">
    <a-form layout="inline">
      <a-form-item label="名称">
        <a-input placeholder="请输入" />
      </a-form-item>
      <a-form-item label="学期">
        <a-select style="width: 172px">
          <a-select-option value="1">1</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="homeworks"
      rowKey="id"
      :pagination="false"
      :loading="loading"
    >
      <template #action="{ record }">
        <span>
          <a @click="onCheck(record.id)">批改</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确认删除当前作业模版？"
            @confirm="onDelete(record.id)"
          >
            <a href="#">删除</a>
          </a-popconfirm>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { columns } from './table';

const router = useRouter();
const loading = ref<boolean>(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const homeworks = [
  {
    id: 1,
    title: '123',
    remark: '123',
  },
];

const onSearch = () => {};

const onCheck = (id:string) => {
  router.push({
    path: '/homework/check?id=' + id,
  })
};

const onPageChange = () => {};
</script>

<style lang="less" scoped>
.homework .ant-pagination {
  margin-top: 24px;
}
.homework .ant-form {
  margin-bottom: 24px;
}
</style>
