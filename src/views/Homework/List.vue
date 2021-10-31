<template>
  <div class="homework">
    <a-form layout="inline">
      <a-form-item label="状态">
        <a-select v-model:value="paramsState.workStatus" style="width: 172px">
          <a-select-option v-for="item in statusList" :value="item" :key="item">{{ WorkStatus[item] }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="所属学期">
        <a-select v-model:value="paramsState.semester" style="width: 172px">
          <a-select-option v-for="item in semesters" :value="item.id" :key="item.id">{{ item.semesterName }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="homeworks" rowKey="id" :pagination="false" :loading="loading">
      <template #status="{ record }">
        <span :style="{ color: WorkStatusColors[record.status] }">{{ WorkStatus[record.status] }}</span>
      </template>
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
          <template v-if="record.status === 2">
            <a @click="onCheck(record.id)">批改</a>
            <a-divider type="vertical" />
          </template>
          <template v-else-if="record.status === 3 || record.status === 4">
            <a @click="onCheck(record.id, 'check')">查看</a>
            <a-divider type="vertical" />
          </template>
          <a-popconfirm title="确认删除当前作业？" @confirm="onDelete(record.id)">
            <a href="#">删除</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
    <a-pagination v-model:current="pageIndex" :total="total" @change="onPageChange" show-less-items />
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw, reactive, UnwrapRef, onMounted } from "vue";
import { useRouter } from "vue-router";
import { message, notification } from "ant-design-vue";
import moment from "moment";
import { columns } from "./table";
import { getHomeworkListByPage, RequestParams, Homework, WorkStatus, deleteHomework } from "../../modules/homework.modules";
import { getSemesterListByPage, Semester } from "../../modules/semester.module";

interface ParamsState {
  semester: string;
  workStatus: number | undefined;
}

enum WorkStatusColors {
  "#18D0CC" = 1,
  "#3A74F2" = 2,
  "#6AD038" = 3,
  "#FA5D5D" = 4,
}

const router = useRouter();

const paramsState: UnwrapRef<ParamsState> = reactive({
  semester: "",
  workStatus: undefined,
});
const semesters = ref<Semester[] | undefined>([]);
const loading = ref<boolean>(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const homeworks = ref<Homework[] | undefined>([]);
const statusList = ref<WorkStatus[] | undefined>([1, 2, 3, 4]);

const getSemesterList = async () => {
  const { data: result } = await getSemesterListByPage({
    pageIndex: 1,
    pageSize: 999,
  });
  semesters.value = result.value!.list;
};
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

const onCheck = (id: string, type: string) => {
  router.push({
    name: "HomeworkCheck",
    query: { id, type },
  });
};

const onPageChange = () => {
  getHomeworkList();
};

const onDelete = async (id: string) => {
  loading.value = true;
  const res = await deleteHomework({ ids: [id] });
  if (res.code === 0) {
    notification.success({ message: "删除成功!" });
    pageIndex.value = 1;
    getHomeworkList();
  }
};

const formatDate = (date: string): string => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
};

onMounted: {
  getHomeworkList();
  getSemesterList();
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
