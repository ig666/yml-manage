import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import NProgress from 'nprogress';
import router from '../router';

export type ApiRequest = () => Promise<void>;
export interface UsableAPI<T> {
  response: Ref<T | undefined>;
  request: ApiRequest;
}

const noTokenUrl: RequestInfo[] = [
  '/api/account/login',
  '/api/account/register',
];
function useApi<T>(url: RequestInfo, data?: any, method: string = 'GET') {
  let options: RequestInit = {};
  const token: string = localStorage.getItem('token')!;
  const headers = new Headers();
  if (!noTokenUrl.includes(url)) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  if (method === 'GET' || method === 'DELETE') {
    const params = data;
    if (params) {
      let paramsArray: string[] = [];
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          paramsArray.push(key + '=' + encodeURIComponent(params[key]));
        }
      });
      url += '?' + paramsArray.join('&');
    }
  } else {
    headers.append('content-type', 'application/json');
    options.body = JSON.stringify(data);
  }

  options.method = method;
  options.headers = headers;
  const response: Ref<T | undefined> = ref();
  const request = async () => {
    try {
      NProgress.start();
      const res = await fetch(url, options);
      NProgress.done();
      if (res.status !== 200) {
        const status = res.status;
        if (status === 404) {
          message.error("请求接口不存在");
        } else if (status === 500) {
          message.error("内部服务器出错");
        }
        return; 
      }
      const data = await res.json();
      switch (data.code) {
        case 0:
          response.value = data.data;
          break;
        case 401:
          message.error('登陆已过期，请重新登陆！');
          localStorage.removeItem('token');
          router.replace({ path: '/login' });
          break;
        default:
          message.error(data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    response,
    request,
  };
}

export { useApi };
