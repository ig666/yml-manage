import { UserState } from './store';

const moduleGetters = {
  isLogin: (state: UserState): string => {
    return `已登陆: ${state.loading}`;
  },
};

export default moduleGetters;
