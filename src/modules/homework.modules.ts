import { useApi } from '../hooks';
import { ref, Ref } from 'vue';

export interface Homework {
  id?: string;
  describe: string; // 标题
  remark: string; // 备注
  wechatUserWorkPhotos: HomeWorkPhotos[];
}

export interface HomeWorkPhotos {
  photoUrl: string; // 图片链接
  photoDescript: string; // 描述
}

export interface ResponseHomework {
  list: Homework[];
  total: number;
}

export interface RequestParams {
  describe?: string;
  pageIndex: number;
  pageSize: number;
}

export type UsableGetHomeworkListByPage = Promise<{
  data: Ref<ResponseHomework | undefined>;
}>;
export const getHomeworkListByPage = async (
  params: RequestParams
): UsableGetHomeworkListByPage => {
  const { request, response: data } = useApi<ResponseHomework>(
    '/api/wechat-user-work',
    params
  );
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { data };
};

export type UsableHomeworkInfo = Promise<{ data: Ref<Homework | undefined> }>;
export const getHomeworkInfo = async (id: string): UsableHomeworkInfo => {
  const { request, response: data } = useApi<Homework>(
    '/api/wechat-user-work/' + id
  );
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { data };
};
