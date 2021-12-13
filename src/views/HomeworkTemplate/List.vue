<template>
  <div class="homework-template">
    <a-form layout="inline">
      <a-form-item label="标题">
        <a-input v-model:value="paramsState.describe" placeholder="请输入"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">搜索</a-button>
        <a-button style="margin-left: 8px" @click="onAdd">新增</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="homeworkTemplates"
      row-key="id"
      :pagination="false"
      :loading="loading"
    >
      <template #createTime="{ record }">
        <span>{{ formatDate(record.createTime) }}</span>
      </template>
      <template #action="{ record }">
        <span>
          <a @click="onRelease(record.id)">发布</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确认删除当前作业模版？" @confirm="onDelete(record.id)">
            <a href="#">删除</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
    <a-pagination
      v-model:current="pageIndex"
      :total="total"
      show-less-items
      @change="onPageChange"
    />
    <a-modal
      v-model:visible="visible"
      title="发布作业"
      :confirm-loading="confirmLoading"
      @ok="onModalConfirm"
      @cancel="onModalCancel"
    >
      <a-form
        ref="formRef"
        :rules="rules"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="学期" name="semesterId">
          <a-select v-model:value="formState.semesterId">
            <a-select-option
              v-for="item in semesters"
              :key="item.id"
              :value="item.id"
              :disabled="isSemesterDisabled(item.homeWorks)"
              >{{ item.semesterName }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, UnwrapRef, reactive, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { message, notification } from 'ant-design-vue';
import { columns } from './table';
import { getSemesterListByPage, Semester } from '../../modules/semester.module';
import {
  getHomeworkTemplateListByPage,
  deleteHomeworkTemplate,
  RequestParams,
  HomeworkTemplate,
  PushHomework,
  pushHomework,
} from '../../modules/homework-template.modules';
import moment from 'moment';

interface ParamsState {
  describe: string;
}

const router = useRouter();

const labelCol = { span: 4 };
const wrapperCol = { span: 18 };
const rules = {
  semesterId: [
    {
      required: true,
      message: '请选择学期',
      trigger: 'change',
      type: 'string',
    },
  ],
};
const paramsState: UnwrapRef<ParamsState> = reactive({
  describe: '',
});
const formState: UnwrapRef<PushHomework> = reactive({
  homeworkId: '',
  semesterId: '',
});
const semesters = ref<Semester[] | undefined>([]);
const homeworkTemplates = ref<HomeworkTemplate[] | undefined>([]);
const loading = ref<boolean>(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const formRef = ref();

const onAdd = (): void => {
  router.push({
    path: '/homework-template/create',
  });
};

const onRelease = (id: string): void => {
  formState.homeworkId = id;
  getSemesterList();
  visible.value = true;
};

const isSemesterDisabled = (homeworks: any) => {
  return homeworks.some((item: any) => formState.homeworkId === item.id);
};

const onModalCancel = () => {
  formState.homeworkId = '';
  formRef.value.resetFields();
};

const onModalConfirm = () => {
  formRef.value.validate().then(async () => {
    confirmLoading.value = true;
    const res = await pushHomework(toRaw(formState));
    confirmLoading.value = false;
    if (res && res.code === 0) {
      notification.success({ message: '发布成功!' });
      visible.value = false;
      formState.homeworkId = '';
      formRef.value.resetFields();
    }
  });
};

const onDelete = async (id: string) => {
  loading.value = true;
  const res = await deleteHomeworkTemplate({ ids: [id] });
  if (res.code === 0) {
    notification.success({ message: '删除成功!' });
    pageIndex.value = 1;
    getHomeworkTemplateList();
  }
};

const onSearch = (): void => {
  pageIndex.value = 1;
  getHomeworkTemplateList();
};

const onPageChange = (page: number, pageSize: number): void => {
  getHomeworkTemplateList();
};

const getSemesterList = async () => {
  const { data: result } = await getSemesterListByPage({
    pageIndex: 1,
    pageSize: 999,
  });
  semesters.value = result.value!.list;
};

const getHomeworkTemplateList = async () => {
  const params: RequestParams = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    ...toRaw(paramsState),
  };
  loading.value = true;
  const { data: result } = await getHomeworkTemplateListByPage(params);
  loading.value = false;
  homeworkTemplates.value = result.value?.list;
  total.value = result.value!.total;
};

const formatDate = (date: string): string => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

onMounted: {
  getHomeworkTemplateList();
}
</script>

<style scoped>
.homework-template .ant-pagination {
  margin-top: 24px;
}
.homework-template .ant-form {
  margin-bottom: 24px;
}
</style>
