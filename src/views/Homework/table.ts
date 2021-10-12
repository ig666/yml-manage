export const columns = [
  {
    title: '标题',
    dataIndex: 'describe',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    slots: { customRender: 'username' },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    slots: { customRender: 'phone' },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    slots: { customRender: 'createTime' },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    slots: { customRender: 'updateTime' },
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];
