import { useApi } from '../hooks';
import { ref, Ref } from 'vue';

export interface HomeworkTemplate {
  id?: string;
  describe: string; // 标题
  remark: string; // 备注
  homeWorkPhotos: HomeWorkPhotos[];
}

export interface HomeWorkPhotos {
  photoUrl: string; // 图片链接
  photoDescript: string; // 描述
}

export interface ResponseHomeworkTemplate {
  list: HomeworkTemplate[];
  total: number;
}

export interface RequestParams {
  describe?: string;
  pageIndex: number;
  pageSize: number;
}

export interface DeleteParams {
  ids: string[];
}

export interface PushHomework {
  homeworkId: string;
  semesterId: string;
}

export type UsableGetHomeworkTemplateListByPage = Promise<{
  data: Ref<ResponseHomeworkTemplate | undefined>;
}>;
export const getHomeworkTemplateListByPage = async (
  params: RequestParams
): UsableGetHomeworkTemplateListByPage => {
  const { request, response: data } = useApi<ResponseHomeworkTemplate>('/api/homework', params);
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { data };
};

export const createHomeworkTemplate = async (data: HomeworkTemplate) => {
  const { request, response } = useApi<any>('/api/homework', data, 'POST');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};

export const deleteHomeworkTemplate = async (data: DeleteParams) => {
  const { request, response } = useApi<any>('/api/homework', data, 'DELETE');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};

export const pushHomework = async (data: PushHomework) => {
  const { request, response } = useApi<any>('/api/homework/push', data, 'POST');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};
