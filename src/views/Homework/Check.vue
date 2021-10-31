<template>
  <div class="homework-check">
    <h2>批改</h2>
    <div class="container">
      <a-row :gutter="12">
        <a-col class="list-complete-item" :span="6" v-for="(item, index) in homeworks" :key="index">
          <a-card hoverable>
            <template #cover>
              <img alt="example" :src="item.photoUrl" />
            </template>
            <a-card-meta title="描述">
              <template #description>
                <p class="desc">{{ item.photoDescript }}</p>
                <div class="operates" style="margin-top: 8px; text-align: right">
                  <a href="#" @click.stop.prevent="onEdit(item)">编辑</a>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
      <div class="choose-status">
        <div class="remark">
          <span style="min-width: 80px">总体评价：</span>
          <a-input v-model:value="homeworkDetail.remark" placeholder="请输入"></a-input>
        </div>
        <div>
          <span>作业打分：</span>
          <a-select v-model:value="homeworkDetail.status" style="width: 172px">
            <a-select-option v-for="item in statusList" :value="item" :key="item">{{ WorkStatus[item] }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="form-group">
        <a-button v-if="onlySee" type="primary" @click="goBack">返回</a-button>
        <a-button v-else type="primary" @click="saveUpdate">保存</a-button>
      </div>
    </div>
    <a-modal v-model:visible="visible" :confirm-loading="confirmLoading" @ok="onModalConfirm" @cancel="onModalCancel" width="100%" wrapClassName="full-modal">
      <div id="tui-image-editor"></div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, UnwrapRef, reactive } from "vue";
import { notification } from "ant-design-vue";
import { useRoute, useRouter } from "vue-router";
import { locale_zh } from "./tui-settings";
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import { useUpload, FileItem } from "../../modules/upload.module";
import ImageEditor from "tui-image-editor";
import moment from "moment";
import { getHomeworkInfo, Homework, WorkStatus, HomeWorkPhotos, updateHomework } from "../../modules/homework.modules";
import { pinyin } from "pinyin-pro";

const route = useRoute();
const router = useRouter();
const statusList = ref<WorkStatus[] | undefined>([3, 4]);
const homeworks = ref<HomeWorkPhotos[] | undefined>([]);
const visible = ref<boolean>(false);
const homeworkDetail = ref<Homework>({
  id: "",
  status: undefined,
  describe: "", // 标题
  remark: "", // 备注
  wechatUser: "",
  wechatUserWorkPhotos: [],
});
const confirmLoading = ref<boolean>(false);
const folderName = ref<string>("");
const onlySee = ref<boolean>(false);
let instance: ImageEditor | null = null;
let wechatUserWorkPhoto: any;

const onEdit = async (item: any) => {
  wechatUserWorkPhoto = item;
  visible.value = true;
  await nextTick();
  const el: Element = document.querySelector("#tui-image-editor")!;
  instance = new ImageEditor(el, {
    includeUI: {
      locale: locale_zh,
      loadImage: {
        path: item.photoUrl,
        name: "image",
      },
      menu: ["text", "shape", "draw", "filter", "crop", "rotate"],
      usageStatistics: false,
      initMenu: "draw",
      menuBarPosition: "right",
    },
  });
};

const getHomeworkDetail = async () => {
  let id = route.query.id as string;
  const { data } = await getHomeworkInfo(id);
  //重置状态为及格
  data.value!.status = 3;
  homeworkDetail.value = data?.value;
  homeworks.value = data?.value?.wechatUserWorkPhotos;
  //拼接上传路径
  folderName.value = `wechat/${pinyin(homeworkDetail.value?.wechatUser.name, { toneType: "none", type: "array" }).join("")}/${moment().format("YYYY-MM-DD")}`;
};

const onModalCancel = () => {
  instance = null;
};

const onModalConfirm = () => {
  wechatUserWorkPhoto.photoUrl = instance?.toDataURL({ format: "jpeg" });
  wechatUserWorkPhoto.doUpdate = true;
  instance = null;
  visible.value = false;
};

const goBack = () => {
  router.go(-1);
};
//将base64转换为文件
const dataURLtoFile = (dataurl: string, name: string) => {
  let arr = dataurl.split(","),
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], name, { type: "image/jpeg" });
};
const saveUpdate = async () => {
  for (let item of homeworkDetail.value.wechatUserWorkPhotos) {
    if (item.doUpdate) {
      let name = Math.random().toString().slice(-6).toString();
      let file = dataURLtoFile(item.photoUrl, name + ".jpeg");
      const { res, url } = await useUpload(file, folderName.value);
      if (res.status === 200) {
        item.photoUrl = url;
      }
    }
  }
  let { code, data } = await updateHomework(homeworkDetail.value);
  if (code === 0) {
    notification.success({ message: data });
    router.go(-1);
  }
};

onMounted: {
  onlySee.value = route.query.type ? true : false;
  getHomeworkDetail();
}
</script>

<style lang="less">
.choose-status {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .remark {
    width: 300px;
    display: flex;
    align-items: center;
    margin-right: 20px;
  }
}
.form-group {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    border-radius: 0;
  }
  .ant-modal-body {
    flex: 1;
    padding: 8px;
  }
}
</style>
<style lang="less" scoped></style>
