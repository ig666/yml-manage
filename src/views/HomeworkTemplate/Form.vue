<template>
  <div class="work-release-form">
    <h2>发布作业</h2>
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
              <img alt="example" :src="item.url" />
            </template>
            <a-card-meta title="描述">
              <template #description>
                <a-input v-model="item.text"></a-input>
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
        :model="formState"
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
        <a-form-item label="备注">
          <a-input></a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">保存</a-button>
          <a-button @click="onBack" style="margin-left: 8px">返回</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, UnwrapRef, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Moment } from 'moment';
import { useUpload, FileItem } from '../../modules/upload.module';

interface FormState {
  class: string;
  time: Moment | undefined;
  date: Moment | undefined;
}

interface HomeWorkItem {
  text: string;
  url: string;
}

const formState: UnwrapRef<FormState> = reactive({
  class: '',
  time: undefined,
  date: undefined,
});

const router = useRouter();
const labelCol = { span: 4 };
const wrapperCol = { span: 14 };
const fileList = ref([]);
const homeworks = ref<HomeWorkItem[]>([]);
const uploadLoading = ref<boolean>(false);

const onSubmit = (): void => {
  const data = toRaw(formState);
  console.log(data.date?.format('YYYY-MM-DD'));
};

const onDelete = (index: number): void => {
  homeworks.value.splice(index, 1);
};

const onBack = () => {
  router.push({ path: '/work-release' });
};

const uploadFile = async (file: FileItem) => {
  uploadLoading.value = true;
  const { res, url } = await useUpload(file);
  if (res.status === 200) {
    homeworks.value.push({
      url,
      text: '',
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
