export const createStore = () => {
  const store = {
    loading: false,
  };
  return store;
};

// 类型推导
export type UserState = ReturnType<typeof createStore>;
