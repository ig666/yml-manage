import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import NProgress from "nprogress";

export type ApiRequest = () => Promise<void>;
export interface UsableAPI<T> {
  response: Ref<T | undefined>;
  request: ApiRequest;
}

function useApi<T>(url: RequestInfo, data?: any, method: string = 'GET') {
  let options: RequestInit = {};
  if (method === 'GET' || method === 'DELETE') {
    const params = data;
    if (params) {
      let paramsArray: string[] = [];
      Object.keys(params).forEach((key) =>
        paramsArray.push(key + '=' + encodeURIComponent(params[key]))
      );
      url += '?' + paramsArray.join('&');
    }
  } else {
    options = {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  }
  options.method = method;
  const response: Ref<T | undefined> = ref();
  const request = async () => {
    try {
      NProgress.start();
      const res = await fetch(url, options);
      const data = await res.json();
      NProgress.done();
      switch (data.code) {
        case 0:
          response.value = data.data;
          break;
        case 401:
          message.error('登陆已过期，请重新登陆！');
          const router = useRouter();
          router.push({ path: '/login' });
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
