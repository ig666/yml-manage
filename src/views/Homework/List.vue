<template>
  <div class="homework">
    <a-form layout="inline">
      <a-form-item label="标题">
        <a-input v-model:value="paramsState.describe" placeholder="请输入" />
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
      <template #username="{ record }">
        <span>{{ record.wechatUser && record.wechatUser.name }}</span>
      </template>
      <template #phone="{ record }">
        <span>{{ record.wechatUser && record.wechatUser.phone }}</span>
      </template>
      <template #createTime="{ record }">
        <span>{{ formatDate(record.createTime) }}</span>
      </template>
      <template #updateTime="{ record }">
        <span>{{ formatDate(record.updateTime) }}</span>
      </template>
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
import { ref, toRaw, reactive, UnwrapRef, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
import { columns } from './table';
import { getHomeworkListByPage, RequestParams, Homework } from '../../modules/homework.modules';

interface ParamsState {
  describe: string;
}

const router = useRouter();

const paramsState: UnwrapRef<ParamsState> = reactive({
  describe: '',
});
const loading = ref<boolean>(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const homeworks = ref<Homework[] | undefined>([]);

const getHomeworkList = async () => {
  const params: RequestParams = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    ...toRaw(paramsState),
  };
  loading.value = true;
  const { data: result } = await getHomeworkListByPage(params);
  loading.value = false;
  homeworks.value = result.value?.list;
  total.value = result.value!.total;
};

const onSearch = () => {
  pageIndex.value = 1;
  getHomeworkList();
};

const onCheck = (id:string) => {
  router.push({
    path: '/homework/check?id=' + id,
  })
};

const onPageChange = () => {
  getHomeworkList();
};

const formatDate = (date: string): string => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

onMounted: {
  getHomeworkList();
}
</script>

<style lang="less" scoped>
.homework .ant-pagination {
  margin-top: 24px;
}
.homework .ant-form {
  margin-bottom: 24px;
}
</style>
