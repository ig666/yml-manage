import { useApi } from '../hooks';
import { ref, Ref } from 'vue';
export enum OrderStatus {
  '成功' = 1, // 成功
  '进行中' = 2, // 进行中
  '失败' = 3, // 失败
}

export interface Order {
  id: string;
  // 订单号
  orderNum: string;

  // 商品名称
  description: string;

  // 支付人id
  payUserId: string;

  // 价格
  price: number;

  // 订单状态
  orderStatus: OrderStatus;

  // 失败原因
  failReason: string;

  createTime: Date;
}

export interface QueryParams {
  pageIndex: number;
  pageSize: number;
  description?: string;
}

export const getOrderList = async (params: QueryParams) => {
  const { request, response } = useApi<any>('/api/wechat-pay-order', params);
  const loading = ref<boolean>(false);
  let result = null;
  if (loading.value === false) {
    result = await request();
    loading.value = true;
  }
  return result;
};
