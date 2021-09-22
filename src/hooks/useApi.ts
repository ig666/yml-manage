import { ref, Ref } from 'vue'
import { message } from 'ant-design-vue';

export type ApiRequest = () => Promise<void>

export interface UsableAPI<T> {
  response: Ref<T | undefined>
  request: ApiRequest
}

function useApi<T> (url: RequestInfo, data?: any, method: string = 'GET') {
  let options: RequestInit = {}
  if (method === 'GET' || method === 'DELETE') {
    const params = data
    if (params) {
      let paramsArray: string[] = []
      Object.keys(params).forEach(key =>
        paramsArray.push(key + '=' + encodeURIComponent(params[key]))
      )
      url += '?' + paramsArray.join('&')
    }
  } else {
    options = {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  }
  options.method = method
  const response: Ref<T | undefined> = ref()
  const request = async () => {
    try {
      const res = await fetch(url, options)
      const data = await res.json()
      if (data.code === 0) {
        response.value = data.data;
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return {
    response,
    request
  }
}

export { useApi }
