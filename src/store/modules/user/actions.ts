import { ActionContext } from 'vuex';
import { GET_DATA } from './constant';
import { UserState } from './store';

export default {
  [GET_DATA]({ commit }: ActionContext<UserState, unknown>): void {
    console.log('执行了action');
    const payload = true;
    setTimeout(() => {
      commit(GET_DATA, payload);
    }, 2000);
  },
};
