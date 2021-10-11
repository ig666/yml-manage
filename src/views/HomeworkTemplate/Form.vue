<template>
  <div class="work-release-form">
    <h2>新增</h2>
    <div class="container">
      <a-row :gutter="12">
        <a-col
          class="list-complete-item"
          :span="6"
          v-for="(item, index) in homeworks"
          :key="index"
        >
          <a-card hoverable>
            <template #cover>
              <img alt="example" :src="item.photoUrl" />
            </template>
            <a-card-meta title="描述">
              <template #description>
                <a-input v-model="item.photoDescript"></a-input>
                <div
                  class="operates"
                  style="margin-top: 8px; text-align: right"
                >
                  <a href="#" @click.stop.prevent="onDelete(index)">删除</a>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="上传">
          <a-upload
            v-model:file-list="fileList"
            name="file"
            :beforeUpload="onBeforeUpload"
            :showUploadList="false"
          >
            <a-button :loading="uploadLoading">上传图片</a-button>
          </a-upload>
        </a-form-item>
        <a-form-item name="describe" label="标题">
          <a-input v-model:value="formState.describe" />
        </a-form-item>
        <a-form-item label="备注">
          <a-input v-model:value="formState.remark" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button :loading="submitLoading" type="primary" @click="onSubmit"
            >保存</a-button
          >
          <a-button @click="onBack" style="margin-left: 8px">返回</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, UnwrapRef, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUpload, FileItem } from '../../modules/upload.module';
import { message, notification } from 'ant-design-vue';
import {
  createHomeworkTemplate,
  HomeWorkPhotos,
  HomeworkTemplate,
} from '../../modules/homework-template.modules';

const formState: UnwrapRef<HomeworkTemplate> = reactive({
  describe: '',
  remark: '',
  homeWorkPhotos: [],
});

const router = useRouter();
const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const fileList = ref([]);
const homeworks = ref<HomeWorkPhotos[]>([]);
const uploadLoading = ref<boolean>(false);
const submitLoading = ref<boolean>(false);
const formRef = ref();

const rules = {
  describe: [
    {
      required: true,
      message: '请输入作业模版标题',
      trigger: 'blur',
      type: 'string',
    },
  ],
};

const onSubmit = () => {
  if (homeworks.value.length === 0) {
    message.error('请上传图片!');
    return;
  }
  formRef.value.validate().then(async () => {
    const data = toRaw(formState);
    data.homeWorkPhotos = homeworks.value;
    submitLoading.value = true;
    const res = await createHomeworkTemplate(data);
    submitLoading.value = false;
    if (res && res.code === 0) {
      notification.success({ message: '新增成功!' });
      router.push({ path: '/homework-template' });
    }
  });
};

const onDelete = (index: number): void => {
  homeworks.value.splice(index, 1);
};

const onBack = () => {
  router.push({ path: '/homework-template' });
};

const uploadFile = async (file: FileItem) => {
  uploadLoading.value = true;
  const { res, url } = await useUpload(file);
  if (res.status === 200) {
    homeworks.value.push({
      photoUrl: url,
      photoDescript: '',
    });
  }
  uploadLoading.value = false;
};

const onBeforeUpload = (file: FileItem, fileList: FileItem[]): boolean => {
  uploadFile(file);
  return false;
};
</script>

<style lang="less" scoped>
.work-release-form {
  .container {
    .btn {
      text-align: center;
      margin-top: 24px;
    }
    .ant-form {
      max-width: 800px;
      margin-top: 24px;
    }
  }
}
</style>
