export const columns = [
  {
    title: '标题',
    dataIndex: 'describe',
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
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];
