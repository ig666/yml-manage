<template>
  <div class="work-release-form">
    <h2>发布作业</h2>
    <div class="container">
      <a-row :gutter="12">
        <a-col :span="6" v-for="i in 4" :key="i">
          <a-card hoverable>
            <template #cover>
              <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
            </template>
            <a-card-meta title="描述">
              <template #description>
                <a-input></a-input>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <div class="form-group">
        <a-upload
          v-model:file-list="fileList"
          name="file"
          :beforeUpload="onBeforeUpload"
          :showUploadList="false"
        >
          <a-button :loading="uploadLoading">上传图片</a-button>
        </a-upload>
      </div>
      <a-form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="班级">
          <a-select
            ref="select"
            v-model:value="formState.class"
          >
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="推送日期">
          <a-date-picker v-model:value="formState.date" style="width: 100%" />
        </a-form-item>
        <a-form-item label="推送时间">
          <a-date-picker v-model:value="formState.time" style="width: 100%" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">发布作业</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRaw, UnwrapRef } from 'vue';
import { Moment } from 'moment';
import { useUpload, FileItem } from '../../modules/upload.module';

interface FormState {
  class: string;
  time: Moment | undefined;
  date: Moment | undefined;
}

const formState: UnwrapRef<FormState> = reactive({
  class: '',
  time: undefined,
  date: undefined,
});

const labelCol = { span: 4 };
const wrapperCol =  { span: 14 };
const fileList = ref([]);
const uploadLoading = ref<boolean>(false);

const onSubmit = ():void => {
  const data = toRaw(formState);
};

const uploadFile = async (file:FileItem) => {
  uploadLoading.value = true;
  const result = await useUpload(file);
  uploadLoading.value = false;
  console.log(result);
}

const onBeforeUpload = (file:FileItem, fileList: FileItem[]):boolean => {
  uploadFile(file);
  return false;
}
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
