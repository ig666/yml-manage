<template>
  <div class="homework-check">
    <h2>评优</h2>
    <div class="container">
      <div>
        <div>
          <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
            全选
          </a-checkbox>
        </div>
        <br />
        <a-checkbox-group v-model:value="checkedList" @change="onChange">
          <a-checkbox v-for="(item, index) in homeworks" :key="index" :value="item.id">
            <a-card hoverable>
              <template #cover>
                <img style="height: 300px" alt="example" :src="item.photoUrl" />
              </template>
              <a-card-meta title="描述">
                <template #description>
                  <p class="desc">{{ item.photoDescript }}</p>
                </template>
              </a-card-meta>
            </a-card>
          </a-checkbox>
        </a-checkbox-group>
      </div>
      <div class="form-group">
        <div style="margin-right: 100px">
          <span>选择分组：</span>
          <a-select v-model:value="goodGroupId" allow-clear style="width: 172px">
            <a-select-option v-for="item in groupList" :key="item" :value="item.id">{{
              item.groupName
            }}</a-select-option>
          </a-select>
        </div>
        <a-button style="margin-right: 50px" type="primary" @click="saveUpdate">保存</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, UnwrapRef, reactive } from 'vue';
import { notification } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { useRoute, useRouter } from 'vue-router';
import { getHomeworkInfo, Homework, HomeWorkPhotos } from '../../modules/homework.modules';
import {
  getGoodGroupListByPage,
  RequestParams,
  goodGroup,
  goodGroupImg,
} from '../../modules/goodGroup.moudules';

const route = useRoute();
const router = useRouter();
const homeworks = ref<HomeWorkPhotos[]>([]);
const indeterminate = ref<Boolean>(false);
const checkAll = ref<Boolean>(false);
const checkedList = ref<string[]>([]);
const groupList = ref<goodGroup[] | undefined>([]);
const goodGroupId = ref<string>();

const onChange = () => {
  indeterminate.value =
    !!checkedList.value.length && checkedList.value.length < homeworks.value?.length;
  checkAll.value = checkedList.value.length === homeworks.value.length;
};
const onCheckAllChange = (e: any) => {
  checkAll.value = e.target.checked;
  indeterminate.value = false;
  checkedList.value = e.target.checked ? homeworks.value.map((item) => item.id) : [];
};

const getHomeworkDetail = async () => {
  let id = route.query.id as string;
  const { data } = await getHomeworkInfo(id);
  homeworks.value = data?.value?.wechatUserWorkPhotos;
};
const getGoodGroupList = async () => {
  const params: RequestParams = {
    pageIndex: 1,
    pageSize: 9999,
  };
  const { data: result } = await getGoodGroupListByPage(params);
  groupList.value = result.value?.list;
};

const goBack = () => {
  router.go(-1);
};
const saveUpdate = async () => {
  if (checkedList.value.length <= 0) return message.warning('请选择评优照片');
  if (!goodGroupId.value) return message.warning('请选择分组');
  const { data } = await goodGroupImg({
    goodGroupId: goodGroupId.value,
    imgIds: checkedList.value,
  });
  if (data) {
    goBack();
  }
};

onMounted: {
  getHomeworkDetail();
  getGoodGroupList();
}
</script>

<style lang="less">
.choose-status {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-group {
  margin-top: 150px;
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
