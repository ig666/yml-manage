<template>
  <div class="homework-check">
    <h2>批改</h2>
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
                <p class="desc">{{ item.photoDescript }}</p>
                <div
                  class="operates"
                  style="margin-top: 8px; text-align: right"
                >
                  <a href="#" @click.stop.prevent="onEdit(item.photoUrl)">编辑</a>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <div class="form-group">
        <a-button type="primary">保存</a-button>
      </div>
    </div>
    <a-modal
      title="作业批改"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="onModalConfirm"
      @cancel="onModalCancel"
      width="90%"
    >
      <div id="tui-image-editor"></div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue';
import { locale_zh } from './tui-settings';
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import ImageEditor from "tui-image-editor";

const homeworks = ref([
  {
    photoUrl: 'http://yameila.oss-cn-beijing.aliyuncs.com/exampledir/WechatIMG5070.jpeg',
    photoDescript: '123',
  }
]);
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
let instance = null;

const onEdit = async (url:string) => {
  visible.value = true;
  await nextTick();
  const el:Element = document.querySelector("#tui-image-editor")!;
  instance = new ImageEditor(el, {
    includeUI: {
      loadImage: {
        path: url,
        name: "image"
      },
      locale: locale_zh,
      initMenu: "draw",
      menuBarPosition: "right",
    },
  })
};

const onModalCancel = () => {
  instance = null;
}

const onModalConfirm = () => {

};
</script>

<style lang="less" scoped></style>
