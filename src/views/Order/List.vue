<template>
  <div class="order">
    <a-form layout="inline">
      <a-form-item label="所属学期">
        <a-select placeholder="选择学期" allowClear v-model:value="form.description" style="width: 172px">
          <a-select-option v-for="item in semesters" :value="item.semesterName" :key="item.id">{{ item.semesterName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table :loading="loading" rowKey="id" :dataSource="orderList" :columns="columns" :pagination="false">
      <template #orderStatus="{ record }">
        <span>{{ OrderStatus[record.orderStatus] }}</span>
      </template>
      <template #createTime="{ record }">
        <span>{{ formatDate(record.createTime) }}</span>
      </template>
    </a-table>
    <a-pagination v-model:current="pageIndex" :total="total" @change="onPageChange" show-less-items />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, UnwrapRef, toRaw } from "vue";
import { columns } from "./table";
import { getSemesterListByPage, Semester } from "../../modules/semester.module";
import { Order, OrderStatus, getOrderList, QueryParams } from "../../modules/wechatOrder.module";
import moment from "moment";

interface form {
  description: string;
}

const form: UnwrapRef<form> = reactive({
  description: "",
});

const semesters = ref<Semester[] | undefined>([]);
const loading = ref<boolean>(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const orderList = ref<Order[] | undefined>([]);

const onSearch = () => {
  pageIndex.value = 1;
  getWechatOrderList();
};

const getSemesterList = async () => {
  const { data: result } = await getSemesterListByPage({
    pageIndex: 1,
    pageSize: 999,
  });
  semesters.value = result.value!.list;
};

const onPageChange = () => {
  getWechatOrderList();
};

// 获取订单列表
const getWechatOrderList = async () => {
  const param: QueryParams = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    ...toRaw(form),
  };
  loading.value = true;
  const { data: result } = await getOrderList(param);
  loading.value = false;
  orderList.value = result.list;
  total.value = result.total || 0;
};

const formatDate = (date: string): string => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

onMounted: {
  getSemesterList();
  getWechatOrderList();
}
</script>

<style lang="less" scoped>
.order .ant-pagination {
  margin-top: 24px;
}
.order .ant-form {
  margin-bottom: 24px;
}
</style>
