export const columns = [
  {
    title: '作业名称',
    dataIndex: 'describe',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '状态',
    dataIndex: 'status',
    slots: { customRender: 'status' },
  },
  {
    title: '所属学期',
    dataIndex: 'semester.semesterName',
  },
  {
    title: '学员名',
    dataIndex: 'username',
    slots: { customRender: 'username' },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    slots: { customRender: 'phone' },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    slots: { customRender: 'updateTime' },
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
