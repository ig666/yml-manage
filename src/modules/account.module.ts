import { useApi } from '../hooks';
import { ref, Ref } from 'vue';
import { UsableGetWechatUserListByPage, ResponseList } from './wechatUser.modules';

interface AccountResponse {
  code: number;
  data: Account;
  message: string;
}

interface AccountRequest {
  account: string;
  gender: Gender;
  password: string;
}

interface LoginRequest {
  account: string;
  password: string;
}

enum Gender {
  man = 1, // 男
  woman = 2, // 女
}

export interface Account {
  id: string;
  account: string;
  token: string;
}

export interface PageRequstParams {
  account: string;
  pageIndex: number;
  pageSize: number
}

export interface Accounts {
  id: string;
  account: string;
  gender: number;
}

export interface PageResponseList {
  accounts: Accounts[] | undefined;
  count: number
}

export interface DeleteParams {
  ids: string[]
}

// 注册
export type UsableRegister = Promise<{ account: Ref<Account | undefined> }>;
export const useRegister = async (data: AccountRequest): UsableRegister => {
  const { request, response: account } = useApi<Account>(
    '/api/account/register',
    data,
    'POST'
  );
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }
  return { account };
};

// 登录
export type UsableLogin = Promise<{ account: Ref<Account | undefined> }>;
export const useLogin = async (data: LoginRequest): UsableLogin => {
  const { request, response: account } = useApi<Account>(
    '/api/account/login',
    data,
    'POST'
  );
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }
  return { account };
};

// 查询管理员列表
export type UsAbleGetAccountListByPage = Promise<{ data: Ref<PageResponseList | undefined> }>
export const getAccountListByPage = async (params: PageRequstParams): UsAbleGetAccountListByPage => {
  const { request, response: data } = useApi<PageResponseList>('/api/account/getListByPage', params)
  const loaded = ref<boolean>(false)
  if(loaded.value === false){
    await request()
    loaded.value = true
  }

  return { data }
}

// 修改密码
export const resetAccount = async (id: string, account: string) => {
  const params = {id, account}
  const { request, response } = useApi<any>('/api/account/resetAccount', params, 'PUT')
    const loading = ref<boolean>(false)
    let result = null
    if(loading.value === false){
        result = await request()
        loading.value = true
    }
    return result
}

// 删除用户
export const deleteAccount = async (params: DeleteParams) => {
  const { request, response } = useApi<any>('/api/account/deleteAccount', params, 'DELETE')
    const loading = ref<boolean>(false)
    let result = null
    if(loading.value === false){
        result = await request()
        loading.value = true
    }
    return result
}