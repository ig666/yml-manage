<template>
  <h1>person</h1>
  <input
    style="display: none"
    type="file"
    ref="input"
    @change="dealfilechange"
  />
  <a-button type="primary" @click="onClick">点击上传oss</a-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useApi } from "../../hooks";
import OSS from "ali-oss";

const input = ref<HTMLInputElement>();
const onClick = () => {
  const inputEvent = input.value;
  inputEvent?.click();
};
const dealfilechange = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  let files = input.files;
  if (files) {
    console.log(files[0]);
    let fetch = useApi("http://localhost:8080/GetAliossTokens");
    let { data } = await fetch.request();
    // sdk提供的创建客户端实例方法
    const client = new OSS({
      region: data.region,
      // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
      accessKeyId: data.AccessKeyId,
      accessKeySecret: data.AccessKeySecret,
      // 填写Bucket名称。
      bucket: data.bucket,
      // 刷新临时访问凭证。
      stsToken: data.SecurityToken,
      refreshSTSToken: async () => {
        let { data } = await fetch.request()
        return {
          accessKeyId: data.AccessKeyId,
          accessKeySecret: data.AccessKeySecret,
          stsToken: data.SecurityToken,
        };
      },
    });

    const result = await client.put(`exampledir/${files[0].name}`, files[0]);
    console.log(result);
  }
};
</script>

<style scoped></style>
