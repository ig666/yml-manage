import { useApi } from '../hooks';
import { ref, Ref } from 'vue';

export interface semester {
  id?: string;
  semesterName: string;
  semesterTitle: string;
  price: number;
  content: string;
  classStartTime: string;
  homeWorks?: any;
}

export interface ResponseSemester {
  list: semester[];
  total: number;
}

export interface RequestParams {
  semesterName?: string;
  pageIndex: number;
  pageSize: number;
}

export type UsableGetSemesterInfo = Promise<{
  semester: Ref<semester | undefined>;
}>;
export const getSemesterInfo = async (id: string): UsableGetSemesterInfo => {
  const { request, response: semester } = useApi<semester>('/api/semester/' + id);
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { semester };
};

export type UsableGetSemesterListByPage = Promise<{
  data: Ref<ResponseSemester | undefined>;
}>;
export const getSemesterListByPage = async (params: RequestParams): UsableGetSemesterListByPage => {
  const { request, response: data } = useApi<ResponseSemester>('/api/semester', params);
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { data };
};

export const createSemester = async (data: semester) => {
  const { request, response } = useApi<any>('/api/semester', data, 'POST');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};

export const updateSemester = async (data: semester) => {
  const { request, response } = useApi<any>('/api/semester', data, 'PUT');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};

export const deleteSemester = async (id: string) => {
  const { request, response } = useApi<any>('/api/semester/' + id, {}, 'DELETE');
  const loaded = ref<boolean>(false);
  let result = null;
  if (loaded.value === false) {
    result = await request();
    loaded.value = true;
  }

  return result;
};
