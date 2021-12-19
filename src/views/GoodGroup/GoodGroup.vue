<template>
  <div class="class">
    <a-form layout="inline" :model="paramsState">
      <a-form-item label="分组名称">
        <a-input v-model:value="paramsState.groupName" placeholder="请输入分组名称"></a-input>
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
      <template #wechatUserWorkPhotos="{ record }">
        <span>{{ record.wechatUserWorkPhotos.length }}</span>
      </template>
      <template #action="{ record }">
        <span>
          <a @click="onEdit(record.id)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="确认删除当前分组？" @confirm="onConfirmDelete(record.id)">
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
          <a-form-item label="分组名称" name="groupName">
            <a-input v-model:value="formState.groupName" placeholder="请输入分组名称" />
          </a-form-item>
          <a-form-item label="分组描述" name="groupDescript">
            <a-input v-model:value="formState.groupDescript" placeholder="请输入分组描述" />
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
  getGoodGroupInfo,
  createGoodGroup,
  updateGoodGroup,
  getGoodGroupListByPage,
  RequestParams,
  goodGroup,
  deleteGoodGroup,
} from '../../modules/goodGroup.moudules';

interface ParamsState {
  groupName: string;
}

interface FormState {
  id?: string;
  groupName: string;
  groupDescript?: string;
}

const columns = [
  {
    title: '分组名称',
    dataIndex: 'groupName',
    key: 'groupName',
  },
  {
    title: '描述',
    dataIndex: 'groupDescript',
    key: 'groupDescript',
  },
  {
    title: '照片数',
    dataIndex: 'wechatUserWorkPhotos',
    key: 'wechatUserWorkPhotos',
    slots: { customRender: 'wechatUserWorkPhotos' },
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];

const data = ref<goodGroup[] | undefined>([]);
const formRef = ref();
const paramsState: UnwrapRef<ParamsState> = reactive({
  groupName: '',
});
const formState: UnwrapRef<FormState> = reactive({
  groupName: '',
  groupDescript: '',
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
  groupName: [{ required: true, message: '请输入学期名称', trigger: 'blur', type: 'string' }],
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
  getGoodGroupList();
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
  const { goodGroup } = await getGoodGroupInfo(id);
  if (goodGroup) {
    formState.id = goodGroup.value!.id;
    formState.groupName = goodGroup.value!.groupName;
    formState.groupDescript = goodGroup.value!.groupDescript;
  }
};

const onConfirmDelete = async (id: string) => {
  loading.value = true;
  const res = await deleteGoodGroup(id);
  if (res.code === 0) {
    notification.success({ message: '删除成功' });
    pageIndex.value = 1;
    getGoodGroupList();
  }
};

const getGoodGroupList = async () => {
  const params: RequestParams = {
    pageIndex: pageIndex.value,
    pageSize: pageSize.value,
    ...toRaw(paramsState),
  };
  loading.value = true;
  const { data: result } = await getGoodGroupListByPage(params);
  loading.value = false;
  data.value = result.value?.list;
  total.value = result.value!.total;
};

const onPageChange = (page: number, pageSize: number) => {
  getGoodGroupList();
};

const onModalConfirm = () => {
  formRef.value
    .validate()
    .then(async () => {
      const data = JSON.parse(JSON.stringify(toRaw(formState)));
      confirmLoading.value = true;
      const res =
        modalType.value === 'add' ? await createGoodGroup(data) : await updateGoodGroup(data);
      confirmLoading.value = false;
      if (res && res.code === 0) {
        notification.success({
          message: modalType.value === 'add' ? '新增成功' : '编辑成功',
        });
        pageIndex.value = 1;
        paramsState.groupName = '';
        visible.value = false;
        getGoodGroupList();
      }
    })
    .catch((error: ValidateErrorEntity<FormState>) => {
      console.log('error', error);
    });
};

onMounted: {
  getGoodGroupList();
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
