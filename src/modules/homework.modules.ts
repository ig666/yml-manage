import { useApi } from '../hooks';
import { ref, Ref } from 'vue';

export enum WorkStatus {
  已发布 = 1, // 已发布
  已提交 = 2, // 已提交
  及格 = 3, // 及格
  不及格 = 4, // 不及格
}
export interface Homework {
  id?: string;
  status: WorkStatus | undefined;
  describe: string; // 标题
  remark: string; // 备注
  wechatUser: any;
  wechatUserWorkPhotos: HomeWorkPhotos[];
}

export interface DeleteParams {
  ids: string[];
}

export interface HomeWorkPhotos {
  photoUrl: string; // 图片链接
  photoDescript: string; // 描述
  doUpdate: boolean;
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
export const getHomeworkListByPage = async (params: RequestParams): UsableGetHomeworkListByPage => {
  const { request, response: data } = useApi<ResponseHomework>('/api/wechat-user-work', params);
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { data };
};

export type UsableHomeworkInfo = Promise<{ data: Ref<Homework> }>;
export const getHomeworkInfo = async (id: string): UsableHomeworkInfo => {
  const { request, response: data } = useApi<Homework>('/api/wechat-user-work/' + id);
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }
  let homeWork = data as unknown as Ref<Homework>;
  return { data: homeWork };
};

export const deleteHomework = async (data: DeleteParams) => {
  const { request, response } = useApi<any>('/api/wechat-user-work', data, 'DELETE');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};

export const updateHomework = async (data: any) => {
  const { request, response } = useApi<any>('/api/wechat-user-work', data, 'PUT');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};
