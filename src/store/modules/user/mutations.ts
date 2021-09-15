import { GET_DATA } from './constant';
import { UserState } from './store';

const mutations = {
  [GET_DATA](state: UserState, payload: boolean): void {
    console.log('mutations 执行了');
    state.loading = payload;
  },
};

export default mutations;
