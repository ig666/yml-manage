import { useApi } from '../hooks';
import { ref, Ref } from 'vue';

export interface goodGroup {
  id?: string;
  groupName: string;
  groupDescript?: string;
  wechatUserWorkPhotos?: any[];
  createTime: Date;
  updateTime: Date;
}

interface ImgForGoup {
  goodGroupId: string;
  imgIds: string[];
}

export interface ResponseGoodGroup {
  list: goodGroup[];
  total: number;
}

export interface RequestParams {
  groupName?: string;
  pageIndex: number;
  pageSize: number;
}

export type UsableGetSemesterInfo = Promise<{
  goodGroup: Ref<goodGroup | undefined>;
}>;
export const getGoodGroupInfo = async (id: string): UsableGetSemesterInfo => {
  const { request, response: goodGroup } = useApi<goodGroup>('/api/good-group/' + id);
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { goodGroup };
};

export type UsableGetSemesterListByPage = Promise<{
  data: Ref<ResponseGoodGroup | undefined>;
}>;
export const getGoodGroupListByPage = async (
  params: RequestParams
): UsableGetSemesterListByPage => {
  const { request, response: data } = useApi<ResponseGoodGroup>('/api/good-group', params);
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { data };
};

export const createGoodGroup = async (data: goodGroup) => {
  const { request, response } = useApi<any>('/api/good-group', data, 'POST');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};

export const updateGoodGroup = async (data: goodGroup) => {
  const { request, response } = useApi<any>('/api/good-group', data, 'PUT');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};

export const deleteGoodGroup = async (id: string) => {
  const { request, response } = useApi<any>('/api/good-group/' + id, {}, 'DELETE');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};

export const goodGroupImg = async (data: ImgForGoup) => {
  const { request, response } = useApi<any>('/api/good-group/image', data, 'POST');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};
