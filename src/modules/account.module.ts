import { useApi } from '../hooks';
import { ref, Ref } from 'vue';

interface AccountResponse{
    code: Number;
    data: Account;
    message: String
}

interface AccountRequest{
    account: String;
    gender: Gender;
    password: String
}

interface LoginRequest{
    account: String;
    password: String
}

enum Gender {
    man = 1, // 男
    woman = 2 // 女
}

export interface Account{
    id: String;
    account: String;
}

// 注册
export type UsableRegister = Promise<{account: Ref<Account | undefined>}>
export const useRegister = async (data: AccountRequest): UsableRegister => {
    const {request, response: account} = useApi<Account>(
        '/api/account/register',
        data,
        'POST'
    )
    const loaded = ref<boolean>(false);
    if (loaded.value === false) {
        await request();
        loaded.value = true;
    }
    return { account };
}

// 登录
export type UsableLogin = Promise<{account: Ref<Account | undefined>}>
export const useLogin = async (data: LoginRequest): UsableLogin => {
    const {request, response: account} = useApi<Account>(
        '/api/account/login',
        data,
        'POST'
    )
    const loaded = ref<boolean>(false);
    if (loaded.value === false) {
        await request();
        loaded.value = true;
    }
    return { account };
}