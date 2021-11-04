import { useApi } from '../hooks';
import { ref, Ref } from 'vue';
import { Semester } from './semester.module'

export interface Users {
    id: string;
    gender: number;
    name: string;
    clinic: string;
    phone: string;
    semesters: Semester[]
}

export interface DeleteParams {
    ids: string[]
}

export interface ResponseList {
    list: Users[];
    todal: number
}

export interface RequestParams {
    name?: string;
    semesterId?: string;
    pageIndex: number;
    pageSize: number;
}

export type UsableGetWechatUserListByPage =  Promise<{data: Ref<ResponseList | undefined>}>
export const getWechatUserListByPage = async (params: RequestParams): UsableGetWechatUserListByPage => {
    const {request, response: data} = useApi<ResponseList>('/api/wechat/getListByPage', params)
    const loading = ref<boolean>(false)
    if(loading.value === false){
        await request()
        loading.value = true
    }
    return { data }
}

export const deleteUser = async (data: DeleteParams) => {
    const { request, response } = useApi<any>('/api/wechat/deleteWechatUser', data, 'DELETE')
    const loading = ref<boolean>(false)
    let result = null
    if(loading.value === false){
        result = await request()
        loading.value = true
    }
    return result
}

