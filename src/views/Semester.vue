<template>
  <div class="class">
    <a-form layout="inline" :model="paramsState">
      <a-form-item label="学期名称">
        <a-input v-model:value="paramsState.semesterName" placeholder="请输入学期名称"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="onSearch">搜索</a-button>
        <a-button style="margin-left: 8px" @click="onAdd">新增</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="data"
      row-key="id"
      :pagination="false"
      :loading="loading"
    >
      <template #date="{ record }">
        <span>{{ formatDate(record.classStartTime) }}</span>
      </template>
      <template #action="{ record }">
        <span>
          <a @click="onEdit(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确认删除当前学期？" @confirm="onConfirmDelete(record.id)">
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
      :title="title"
      :confirm-loading="confirmLoading"
      @ok="onModalConfirm"
    >
      <template v-if="modalType === 'add' || modalType === 'edit'">
        <a-form
          ref="formRef"
          :rules="rules"
          :model="formState"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-item label="学期名称" name="semesterName">
            <a-input v-model:value="formState.semesterName" placeholder="请输入学期名称" />
          </a-form-item>
          <a-form-item label="学期标题" name="semesterTitle">
            <a-input v-model:value="formState.semesterTitle" placeholder="请输入学期标题" />
          </a-form-item>
          <a-form-item label="价格" name="price">
            <a-input-number
              v-model:value="formState.price"
              :disabled="modalType === 'edit'"
              :min="0"
            />
          </a-form-item>
          <a-form-item label="开课时间" name="classStartTime">
            <a-date-picker
              v-model:value="formState.classStartTime"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择开课时间"
            />
          </a-form-item>
          <a-form-item label="内容" name="content">
            <a-textarea v-model:value="formState.content" show-count :maxlength="1000" />
          </a-form-item>
        </a-form>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, UnwrapRef, reactive, computed, toRaw, nextTick } from 'vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { Moment } from 'moment';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import {
  getSemesterInfo,
  createSemester,
  updateSemester,
  getSemesterListByPage,
  RequestParams,
  Semester,
  deleteSemester,
} from '../modules/semester.module';

interface ParamsState {
  semesterName: string;
}

interface FormState {
  id?: string;
  semesterName: string;
  semesterTitle: string;
  price: number;
  content: string;
  classStartTime: Moment | undefined;
}

const columns = [
  {
    title: '学期名称',
    dataIndex: 'semesterName',
    key: 'semesterName',
  },
  {
    title: '学期标题',
    dataIndex: 'semesterTitle',
    key: 'semesterTitle',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '开课时间',
    dataIndex: 'classStartTime',
    key: 'classStartTime',
    slots: { customRender: 'date' },
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];

const data = ref<Semester[] | undefined>([]);
const formRef = ref();
const paramsState: UnwrapRef<ParamsState> = reactive({
  semesterName: '',
});
const formState: UnwrapRef<FormState> = reactive({
  semesterName: '',
  semesterTitle: '',
  price: 0,
  content: '',
  classStartTime: undefined,
});
const loading = ref<boolean>(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const modalType = ref<string>('');
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const labelCol = { span: 4 };
const wrapperCol = { span: 18 };
const rules = {
  semesterName: [{ required: true, message: '请输入学期名称', trigger: 'blur', type: 'string' }],
  semesterTitle: [{ required: true, message: '请输入学期标题', trigger: 'blur', type: 'string' }],
  price: [{ required: true, message: '请输入价格', trigger: 'blur', type: 'number' }],
  classStartTime: [
    { required: true, message: '请选择开课时间', trigger: 'change', type: 'object' },
  ],
  content: [{ required: true, message: '请输入内容', trigger: 'blur', type: 'string' }],
};

const title = computed<string>(() => {
  switch (modalType.value) {
    case 'add':
      return '新增';
    case 'edit':
      return '编辑';
    default:
      return '';
  }
});

const formatDate = (date: string): string => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

const resetForm = () => {
  formState.id = undefined;
  formRef.value.resetFields();
};

const onSearch = () => {
  pageIndex.value = 1;
  getSemesterList();
};

const onAdd = async () => {
  modalType.value = 'add';
  visible.value = true;
  await nextTick();
  resetForm();
};

const onEdit = async (id: string) => {
  modalType.value = 'edit';
  visible.value = true;
  const { semester } = await getSemesterInfo(id);
  if (semester) {
    formState.id = semester.value!.id;
    formState.semesterName = semester.value!.semesterName;
    formState.semesterTitle = semester.value!.semesterTitle;
    formState.price = semester.value!.price;
    formState.content = semester.value!.content;
    formState.classStartTime = moment(semester.value?.classStartTime);
  }
};

const onConfirmDelete = async (id: string) => {
  loading.value = true;
  const res = await deleteSemester(id);
  if (res.code === 0) {
    notification.success({ message: '删除成功' });
    pageIndex.value = 1;
    getSemesterList();
  }
};

const getSemesterList = async () => {
  const params: RequestParams = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    ...toRaw(paramsState),
  };
  loading.value = true;
  const { data: result } = await getSemesterListByPage(params);
  loading.value = false;
  data.value = result.value?.list;
  total.value = result.value!.total;
};

const onPageChange = (page: number, pageSize: number) => {
  getSemesterList();
};

const onModalConfirm = () => {
  formRef.value
    .validate()
    .then(async () => {
      const data = JSON.parse(JSON.stringify(toRaw(formState)));
      data.classStartTime = moment(data.classStartTime).format('YYYY-MM-DD HH:mm:ss');
      confirmLoading.value = true;
      const res =
        modalType.value === 'add' ? await createSemester(data) : await updateSemester(data);
      confirmLoading.value = false;
      if (res && res.code === 0) {
        notification.success({
          message: modalType.value === 'add' ? '新增成功' : '编辑成功',
        });
        pageIndex.value = 1;
        paramsState.semesterName = '';
        visible.value = false;
        getSemesterList();
      }
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      console.log('error', error);
    });
};

onMounted: {
  getSemesterList();
}
</script>

<style lang="less" scoped>
.class .ant-pagination {
  margin-top: 24px;
}
.class .ant-form {
  margin-bottom: 24px;
}
</style>
