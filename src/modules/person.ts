import { useApi } from '../hooks';
import { ref, Ref } from 'vue';

export interface Person {
  resources: Resources;
  rate: Rate;
}

export interface Rate {
  limit: number;
  remaining: number;
  reset: number;
  used: number;
  resource: string;
}

export interface Resources {
  core: Rate;
  graphql: Rate;
  integration_manifest: Rate;
  search: Rate;
}

export interface QueryParams {
  pageIndex: number;
  pageSize: number;
  name?: string;
  age?: number;
}

export type UsablePerson = Promise<{ person: Ref<Person | undefined> }>;
export const usePerson = async (): UsablePerson => {
  const options = {
    method: 'GET',
    params: { name: 'chen' },
  };

  const { request, response: person } = useApi<Person>(
    'https://api.github.com/rate_limit'
  );
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { person };
};

export type UsablePersonInfo = Promise<{ personInfo: Ref<Person | undefined> }>;
export const getPersonInfo = async (params: QueryParams): UsablePersonInfo => {
  const { request, response: personInfo } = useApi<Person>(
    'https://api.github.com/rate_limit',
    params
  );
  const loaded = ref<boolean>(false);
  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { personInfo };
};
