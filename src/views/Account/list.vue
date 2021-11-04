<template>
  <div class="account">
    <a-form layout="inline">
      <a-form-item label="姓名">
        <a-input allowClear @pressEnter="onSearch" v-model:value="searchForm.account" placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">搜索</a-button>
        <a-button @click="onAdd" style="margin-left: 8px">新增</a-button>
      </a-form-item>
    </a-form>
    <a-table :loading="loading" rowKey="id" :dataSource="accounts" :columns="columns" :pagination="false">
      <template #gender="{record}">
        <span>{{ Gender[record.gender] }}</span>
      </template>
      <template #createTime="{record}">
        <span>{{ formatDate(record.createTime) }}</span>
      </template>
      <template #action="{record}">
        <a-popconfirm title="确认重置密码？" @confirm="onReset(record.id)">
          <a href="#">重置密码</a>
        </a-popconfirm>
        <a-popconfirm title="确认删除当前账号？" @confirm="onDelete(record.id)">
          <a style="margin-left:8px" href="#">删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-pagination v-model:current="pageIndex" :total="total" @change="onPageChange" show-less-items />
  </div>
</template>

<script setup lang="ts">
import { notification } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { ref, reactive, UnwrapRef, toRaw } from "vue";
import { Accounts, getAccountListByPage, deleteAccount } from '../../modules/account.module'
import { columns } from './table'
import moment from 'moment';
const router = useRouter()

interface SearchForm {
  account: string
}

enum Gender{
  '男' = 1,
  '女' = 2
}

const searchForm: UnwrapRef<SearchForm> = reactive({
  account: ''
})
const loading = ref<boolean>(false)
const pageIndex = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const accounts = ref<Accounts | undefined>([])

// 点击新增
const onAdd = () => {
  router.push({
    path: '/account/create'
  })
}

// 删除
const onDelete = async (id: string) => {
  return
  loading.value = true
  const res: any = await deleteAccount({ids: [id]})
  loading.value = false
  if (res.code === 0) {
    notification.success({ message: "删除成功!" });
    pageIndex.value = 1;
    getAccountList();
  }
}
// 重置密码
const onReset = (id: string) => {

}

// 搜索
const onSearch = () => {
  getAccountList()
}
// 翻页
const onPageChange = () => {
  getAccountList();
};
// 获取账号列表
const getAccountList = async() => {
  const params = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    ...toRaw(searchForm)
  }
  loading.value = true
  const { data: result } = await getAccountListByPage(params)
  loading.value = false
  accounts.value = result.value?.accounts
  total.value = result.value?.count || 0
}

// 格式化日期
const formatDate = (date: string): string => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};
onMounted: {
  getAccountList()
}

</script>

<style lang="less" scoped>
.account .ant-pagination {
  margin-top: 24px;
}
.account .ant-form {
  margin-bottom: 24px;
}
</style>
