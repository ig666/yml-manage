import OSS from 'ali-oss';
import { useApi } from '../hooks';
import { ref, Ref } from 'vue';

export interface OSSRequestData {
  region: string;
  AccessKeyId: string;
  AccessKeySecret: string;
  bucket: string;
  SecurityToken: string;
}

export interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

export type UsableOSSRequestData = Promise<{
  data: Ref<OSSRequestData | undefined>;
}>;
export const getOSSRequestData = async (): UsableOSSRequestData => {
  const { request, response: data } = useApi<OSSRequestData>(
    '/api/GetAliossTokens'
  );
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { data };
};

export const useUpload = async (file: FileItem) => {
  const { data } = await getOSSRequestData();
  console.log(data);

  const client = new OSS({
    region: data.value?.region,
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: data.value!.AccessKeyId,
    accessKeySecret: data.value!.AccessKeySecret,
    // 填写Bucket名称。
    bucket: data.value?.bucket,
    // 刷新临时访问凭证。
    stsToken: data.value?.SecurityToken,
    refreshSTSToken: async () => {
      const { data } = await getOSSRequestData();
      return {
        accessKeyId: data.value!.AccessKeyId,
        accessKeySecret: data.value!.AccessKeySecret,
        stsToken: data.value!.SecurityToken,
      };
    },
  });

  const result = await client.put(`exampledir/${file!.name}`, file);
  return result;
};
