export const columns = [
  {
    title: "订单号",
    dataIndex: "orderNum",
  },
  {
    title: "学期名称",
    dataIndex: "description",
  },
  {
    title: "价格",
    dataIndex: "price",
  },
  {
    title: "订单状态",
    dataIndex: "orderStatus",
    slots: { customRender: "orderStatus" },
  },
  {
    title: "失败原因",
    dataIndex: "failReason",
  },
  {
    title: "支付人",
    dataIndex: "wechatUser.name",
  },
  {
    title: "手机号",
    dataIndex: "wechatUser.phone",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    slots: { customRender: "createTime" },
  },
];
